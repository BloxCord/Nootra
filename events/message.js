// Require / Dependancies //
const Discord = require("discord.js");
const {
    Client,
    Util
} = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const ms = require('ms');
const fs = require('fs');
const sql = require('sqlite');
const config = require("../storage/globalSettings.js");
const logger = require('../function/logger.js');
const global = require('../function/global.js');
////////////////////////////

const youtube = new YouTube(config.apiYoutube);
sql.open('./storage/levels.sqlite');
const cooldowns = new Discord.Collection();
var serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));


function exec(client, message, args, _command) {
    if (!cooldowns.has(_command.name)) {
        cooldowns.set(_command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(_command.name);
    const cooldownAmount = (_command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id) && !config.devs.includes(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${_command.name}\` command.`);
        }
    } else {
        console.log(`${message.author.tag} ran ${_command.name} command`);
        _command.execute(client, message, args);
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}

exports.run = async (client, message) => {

    // Security
    if (message.author.bot) return;
    if (message.length >= 1400) return;

    if (!message.channel.type === 'dm') {
        if (!serverSettings[message.guild.id]) {
            serverSettings[message.guild.id] = {
                prefix: config.defaultPrefix,
                language: 'english',
                level: 'on'
            };

            fs.writeFile('./storage/serverSettings.json', JSON.stringify(serverSettings), (err) => {
                if (err) {
                    return logger.newError(client, err, __filename);
                }
            });
        }
    }

    // Command
    var prefix = message.channel.type === 'dm' ? config.defaultPrefix : serverSettings[message.guild.id].prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    logger.messageSent(client, message);

    // Command handler
    if (message.content.startsWith(prefix)) {
        if (client.commands.has(command)) {
            var _command = client.commands.get(command);
            try {
                if (_command.devOnly) {
                    if (!config.devs.includes(message.author.id)) return;
                    else {
                        console.log(`${message.author.tag} ran ${command} command`);
                        return _command.execute(client, message, args);
                    }
                } else if (_command.perms.length > 0) {
                    var authArray = [];
                    _command.perms.forEach((perm) => {
                        if (message.member.hasPermission(perm) && message.guild.me.hasPermission(perm)) authArray.push(true);
                        else authArray.push(false);
                    });
                    if (authArray.includes(false) && !config.devs.includes(message.author.id)) return message.reply('missing permissions!');
                    else {
                        exec(client, message, args, _command);
                    }
                } else {
                    exec(client, message, args, _command);
                }
            } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }
        }
    }

    if (config.devs.includes(message.author.id)) {
        if (message.content.match(/^\`\`\`(eval|javascript)\n/)) {

            global.del(message, 5000);

            var code = message.content.split(/^\`\`\`(eval|javascript)\n/).pop().split('```')[0];
            try {
                var evaled = eval(code);
                console.log(evaled);
                if (typeof evaled !== "string") {
                    evaled = require("util").inspect(evaled);
                }

                return message.channel.send(new Discord.RichEmbed()
                    .addField("\`📥\` **Input**", message.content, false)
                    .addField("\`📤\` **Output**", `\`\`\`js\n${global.clean(evaled)}\`\`\``, false)
                    .setColor('FF0000')
                ).then((msg) => msg.react(global.searchEmoji(client, '435603381818490880').id));
            } catch (err) {
                console.log(err);
                return message.channel.send(new Discord.RichEmbed()
                    .addField("\`📥\` **Input**", message.content, false)
                    .addField("\`📤\` **Output**", `\`\`\`js\n${global.clean(err.toString())}\`\`\``)
                    .setColor('FF0000')
                ).then((msg) => msg.react(global.searchEmoji(client, '435603381269037057').id));
            }
        }
    }

    if (!message.channel.type === 'dm') {
        sql.get(`SELECT * FROM levels WHERE ID ="${message.author.id}"`).then((row) => {
            if (!row) {
                sql.run("INSERT INTO levels (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 1]);
            } else {
                var curLevelp = 0.1 * Math.sqrt(row.points + 1);
                var curLevel = Math.floor(curLevelp);
                if (curLevelp > row.level) {
                    sql.run(`UPDATE levels SET points = 1, level = ${row.level + 1} WHERE ID = ${message.author.id}`);
                    const levelUp = new Discord.RichEmbed()
                        .setAuthor('Levels', 'https://png.icons8.com/trophy/dusk/50')
                        .setColor('FF0000')
                        .setDescription(`Congratulation, ${message.author} is now level **${row.level}** !\n("${prefix}level" for information)`)
                        .setFooter(config.name, config.avatar);
                    message.channel.send(levelUp);
                }
                if (serverSettings.level === false) {
                    sql.run(`UPDATE levels SET points = ${row.points} WHERE ID = ${message.author.id}`);
                } else {
                    sql.run(`UPDATE levels SET points = ${row.points + 1} WHERE ID = ${message.author.id}`);
                }
            }
        }).catch((error) => {
            console.log(error);
            logger.newError(client, error, __filename);
            sql.run("CREATE TABLE IF NOT EXISTS levels (ID TEXT, points INTEGER, level INTEGER)").then(() => {
                sql.run("INSERT INTO levels (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 1]);
            });
        });
    }

};
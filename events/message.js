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
const config = require("../config.js");
const espion = require('../function/espion.js');
const global = require('../function/global.js');
const client = new Discord.Client();
////////////////////////////

sql.open('./db/levels.sqlite');

var cooldown = new Set();

const youtube = new YouTube(config.api_youtube);

const queue = new Map();

exports.run = async (client, message) => {

    // Shortcuts
    var msg = message.content;
    var author = message.author;
    var channel = message.channel;
    var guild = message.guild;
    var user = message.member;

    // Security
    const ErrEmbed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setAuthor('[ERROR ❌]')
        .setDescription(`I don't respond to direct messages, sorry! [\`❌\`]`);

    if (message.channel.type === 'dm' && message.author.id !== config.id) {
        return author.send(ErrEmbed);
    }
    if (author.bot === true) {
        return;
    }
    if (message.length >= 1400) {
        return;
    }

    if (config.id !== '416534697703636993') {
        if (message.channel.id === '444773528479334400') {
            message ? message.delete(2000) : message;
        }
    }

        // Command
        const args = msg.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var content = args.join(' ');

    espion.message_sent(client, message);

    // Command handler
    if (msg.startsWith(config.prefix)) {
        try {
            var commandFile = require(`../commands/${command}.js`);
            if (commandFile) {
                if (cooldown.has(`${author.id}-${command}`)) {
                    return;
                } else {
                    if (message.author.id !== config.admin) {
                        cooldown.add(`${author.id}-${command}`);
                    }
                    console.log(`${message.author.tag} ran ${command} command`);
                    commandFile.run(client, message, args);
                    setTimeout(() => {
                        cooldown.delete(`${author.id}-${command}`);
                    }, ms(commandFile.timer));
                }
            }
        } catch (error) {

        }
    }

    if (message.author.id === config.admin) {
        if (message.content.match(/^\`\`\`(js|javascript)\n/)) {
            message ? message.delete(2000) : message;
            const yes = client.emojis.find('id', '435603381818490880');
            const no = client.emojis.find('id', '435603381269037057');
            var code = message.content.split(/^\`\`\`(js|javascript)\n/).pop().split('```')[0];
            try {
                var evaled = eval(code);
                console.log(evaled);
                if (typeof evaled !== "string") {
                    evaled = require("util").inspect(evaled);
                }
                var embed = new Discord.RichEmbed()
                    .addField("\`📥\` **Input**", message.content, false)
                    .addField("\`📤\` **Output**", `\`\`\`js\n${global.clean(evaled)}\`\`\``, false)
                    .setColor('FF0000');
                return message.channel.send(embed).then((msg) => msg.react(yes.id));

            } catch (err) {
                console.log(err);
                const ErrorEmbed = new Discord.RichEmbed()
                    .addField("\`📥\` **Input**", message.content, false)
                    .addField("\`📤\` **Output**", `\`\`\`js\n${global.clean(err)}\`\`\``)
                    .setColor('FF0000');
                return message.channel.send(ErrorEmbed).then((msg) => msg.react(no.id));
            }
        }
    }

    // Levels
    sql.get(`SELECT * FROM levels WHERE ID ="${message.author.id}"`).then((row) => {
        if (!row) {
            sql.run("INSERT INTO levels (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 1]);
        } else {
            var curLevelp = 0.1 * Math.sqrt(row.points + 1);
            var curLevel = Math.floor(curLevelp);
            if (curLevelp > row.level) {
                sql.run(`UPDATE levels SET points = 1, level = ${row.level + 1} WHERE ID = ${message.author.id}`);
                const levelup = new Discord.RichEmbed()
                    .setAuthor('Levels', 'https://png.icons8.com/trophy/dusk/50')
                    .setColor('FF0000')
                    .setDescription(`Congratulation ${message.author} who is now level **${row.level}** !\n("${config.prefix}level" for information)`)
                    .setFooter(config.name, config.avatar);
                if (curLevel === 0) {
                    return;
                } else {
                    return channel.send(levelup);
                }
            }
            if (message.guild.id === '417305635168845825' || message.guild.id === '110373943822540800') {
                sql.run(`UPDATE levels SET points = ${row.points} WHERE ID = ${message.author.id}`);
            } else {
                sql.run(`UPDATE levels SET points = ${row.points + 1} WHERE ID = ${message.author.id}`);
            }
        }
    }).catch((error) => {
        console.log(error);
        espion.new_error(client, error);
        sql.run("CREATE TABLE IF NOT EXISTS levels (ID TEXT, points INTEGER, level INTEGER)").then(() => {
            sql.run("INSERT INTO levels (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 1]);
        });
    });

    // Musique
    const searchString = content;
    const serverQueue = queue.get(message.guild.id);
    const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    const voiceChannel = message.member.voiceChannel;

    if (command === 'play' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        if (!voiceChannel) {
            return message.reply("you're not in a vocal channel.");
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has('CONNECT')) {
            return message.reply("I can't connect in this channel.");
        }
        if (!permissions.has('SPEAK')) {
            return message.reply("I can't talk in this channel.");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, voiceChannel, true);
            }
            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Play', 'https://png.icons8.com/play/dusk/50')
                .setDescription(`Added "${playlist.title}" to queue!`);
            return channel.send(embed);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (error) {
                    return espion.new_error(client, error);
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    }

    if (command === 'skip' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        var userrole = user.roles;
        if (userrole === null) {
            return;
        }
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {
            if (!message.member.voiceChannel) {
                return message.reply("you're not in a vocal channel.");
            }
            if (!serverQueue) {
                return message.reply("nothing's playing.");
            }
            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Skip', 'https://png.icons8.com/chevron_right/dusk/50')
                .setDescription(`Song skipped \`⏩\``);
            message.channel.send(embed);
            serverQueue.connection.dispatcher.end();
            return undefined;
        } else {
            return message.reply("this command is restricted");
        }
    }

    if (command === 'stop' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        var userrole = user.roles;
        if (userrole === null) {
            return;
        }
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {
            if (!message.member.voiceChannel) {
                return message.reply("you're not in a vocal channel.");
            }
            if (!serverQueue) {
                return message.reply("nothing's playing.");
            }
            serverQueue.songs = [];
            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Stop', 'https://png.icons8.com/stop/dusk/50')
                .setDescription(`Stop asked by ${message.author.username} \`🚫\``);
            message.channel.send(embed);
            serverQueue.connection.dispatcher.end();
            return undefined;
        } else {
            return message.reply("this command is restricted");
        }
    }

    if (command === 'volume' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        var userrole = user.roles;
        if (userrole === null) {
            return;
        }
        var volume = '';
        var volume = serverQueue.volume <= 10 ? '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬' : serverQueue.volume <= 20 ? '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬' : serverQueue.volume <= 30 ? '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬' : serverQueue.volume <= 40 ? '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬' : serverQueue.volume <= 50 ? '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬' : serverQueue.volume <= 60 ? '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬' : serverQueue.volume <= 70 ? '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬' : serverQueue.volume <= 80 ? '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬' : serverQueue.volume <= 90 ? '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬' : '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)';
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {
            if (!message.member.voiceChannel) {
                return message.reply("you're not in a vocal channel.");
            }
            if (!serverQueue) {
                return message.reply("nothing's playing.");
            }
            if (!args[0]) {
                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Volume', 'https://png.icons8.com/audio/dusk/50')
                    .setDescription(`
Actual volume : **${serverQueue.volume}%**
\`[1%]\` ${volume} \`[100%] 🔊\`
                    `);
                return message.channel.send(embed);
            } else if (args[0] < 1 || args[0] > 100) {
                return message.reply("you don't have access to those values (Authorized values : 1 to 100)");
            } else {
                serverQueue.volume = args[0];
                serverQueue.connection.dispatcher.setVolume(args[0] / 100);

                var newvolume = '';
                var newvolume = serverQueue.volume <= 10 ? '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬' : serverQueue.volume <= 20 ? '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬' : serverQueue.volume <= 30 ? '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬' : serverQueue.volume <= 40 ? '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬' : serverQueue.volume <= 50 ? '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬' : serverQueue.volume <= 60 ? '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬' : serverQueue.volume <= 70 ? '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬' : serverQueue.volume <= 80 ? '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬' : serverQueue.volume <= 90 ? '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬' : '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)';

                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Volume', 'https://png.icons8.com/audio/dusk/50')
                    .setDescription(`
Volume is now set at **${args[0]}%**
\`[1%]\` ${newvolume} \`[100%] 🔊\`
                    `);
                return message.channel.send(embed);
            }

        } else {
            return message.reply("this command is restricted");
        }
    }

    if (command === 'now' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        if (!serverQueue) {
            return message.reply("nothing's playing.");
        }
        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Now', 'https://png.icons8.com/play/dusk/50')
            .addField('Now playing:', `${serverQueue.songs[0].title} \`🔊\``)
            .setImage(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/maxresdefault.jpg`, serverQueue.songs[0].url, 100, 100);
        return channel.send(embed);
    }
    if (command === 'queue' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        if (!serverQueue) {
            return message.reply("nothing's playing.");
        }
        var index = 0;
        var page = 1;
        var longArray = serverQueue.songs;
        var shortArrays = [],
            i, len;
        for (i = 0, len = longArray.length; i < len; i += 10) {
            shortArrays.push(longArray.slice(i, i + 10));
        }
        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Queue', 'https://png.icons8.com/sorting/dusk/50')
            .setDescription(shortArrays[page - 1].map((song) => `${song.title}`));
        if (shortArrays.length > 1) {
            embed.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
        }
        channel.send(embed).then((msg) => {
            if (shortArrays.length > 1) {
                msg.react('⏪').then(() => {
                    msg.react('🛑').then(() => msg.react('⏩'));
                });
            }
            const backwards = msg.createReactionCollector((reaction) => reaction.emoji.name === '⏪', {
                time: ms('1day')
            });
            const forwards = msg.createReactionCollector((reaction) => reaction.emoji.name === '⏩', {
                time: ms('1day')
            });
            const page1 = msg.createReactionCollector((reaction) => reaction.emoji.name === '🛑', {
                time: ms('1day')
            });
            page1.on('end', (msg) => msg.clearReactions());

            function BackwardReset() {
                embed.setDescription(shortArrays[page - 1].map((song) => `${song.title}`));
                embed.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(embed);
            }

            function ForwardReset() {
                embed.setDescription(shortArrays[page - 1].map((song) => `${song.title}`));
                embed.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(embed);
            }

            function Page1Reset() {
                embed.setDescription(shortArrays[page - 1].map((song) => `${song.title}`));
                embed.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(embed);
            }
            backwards.on('collect', (r) => {
                if (user.id !== config.id) {
                    if (page === 1) {
                        return;
                    }
                    page--;
                    BackwardReset();
                    r.remove(user.id);
                } else {
                    return;
                }
            });
            forwards.on('collect', (r) => {
                if (user.id !== config.id) {
                    if (page === shortArrays.length) {
                        return;
                    }
                    page++;
                    ForwardReset();
                    r.remove(user.id);
                } else {
                    return;
                }
            });
            page1.on('collect', (r) => {
                if (user.id !== config.id) {
                    if (page === 1) {
                        return r.remove(user.id);
                    }
                    page = 1;
                    Page1Reset();
                    r.remove(user.id);
                } else {
                    return;
                }
            });
        });
    }

    if (command === 'pause' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        var userrole = user.roles;
        if (userrole === null) {
            return;
        }
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {
            if (serverQueue && serverQueue.playing === true) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Pause', 'https://png.icons8.com/stop/dusk/50')
                    .setDescription(`Stream paused by ${message.author.username}`);
                return message.channel.send(embed);
            }
        }
    }

    if (command === 'resume' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        var userrole = user.roles;
        if (userrole === null) {
            return;
        }
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {
            if (serverQueue && serverQueue.playing === false) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Resume', 'https://png.icons8.com/resume_button/dusk/50')
                    .setDescription(`Stream resumed by ${message.author.username}`);
                return message.channel.send(embed);
            }
        }
    }

    if (command === 'repeat' && msg.startsWith(config.prefix)) {
        message ? message.delete(2000) : message;
        if (args[0] === 'on') {
            const TrueEmbed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Repeat', 'https://png.icons8.com/repeat/dusk/50')
                .setDescription(`**Repeat mode : on** \`✅\``);
            serverQueue.repeat = true;
            return message.channel.send(TrueEmbed);
        } else if (args[0] === 'off') {
            const FalseEmbed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Repeat', 'https://png.icons8.com/repeat/dusk/50')
                .setDescription(`**Repeat mode : off** \`✅\``);
            serverQueue.repeat = false;
            return message.channel.send(FalseEmbed);
        }
    }

    async function handleVideo(video, message, voiceChannel, playlist = false) {
        const serverQueue = queue.get(message.guild.id);
        const song = {
            id: video.id,
            title: (video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 50,
                playing: true,
                repeat: false
            };
            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.log(error);
                return espion.new_error(client, error);
            }
        } else {
            serverQueue.songs.push(song);
            if (playlist) {
                return undefined;
            } else {
                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Play', 'https://png.icons8.com/play/dusk/50')
                    .setDescription(`\`${song.title}\` added to queue !`);
                return message.channel.send(embed);
            }
        }
    }

    function play(guild, song) {
        const serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            return queue.delete(guild.id);
        }

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
            filter: "audioonly"
        }));
        dispatcher.on('end', () => {
            try {
                if (!serverQueue) {
                    const embed = new Discord.RichEmbed()
                        .setColor("FF0000")
                        .setAuthor('Music', 'https://png.icons8.com/end/dusk/50')
                        .setDescription(`Queue ended.`);
                    serverQueue.voiceChannel.leave();
                    return message.channel.send(embed);
                } else if (serverQueue.repeat === true) {
                    play(guild, serverQueue.songs[0]);
                } else {
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                }
            } catch (error) {
                serverQueue.voiceChannel.leave();
                console.log(error);
                return espion.new_error(client, error);
            }
        });
        dispatcher.on('error', (error) => {
            console.log(error);
            espion.new_error(client, error);
            return message.channel.send(`I had to stop because :\n\`\`\`${error}\`\`\``);
        });
        dispatcher.setVolume(serverQueue.volume / 100);
        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Play', 'https://png.icons8.com/play/dusk/50')
            .setTitle('Direct link')
            .setURL(song.url)
            .setImage(`https://i.ytimg.com/vi/${song.id}/maxresdefault.jpg`)
            .addField("Now playing :", song.title, false)
            .setTimestamp();
        return serverQueue.textChannel.send(embed);
    }

};
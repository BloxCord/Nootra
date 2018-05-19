const config = require('../config.js');
const Discord = require('discord.js');
const sql = require('sqlite');
exports.timer = '2seconds';
exports.run = (client, message) => {
message ? message.delete(2000) : message;
    sql.open('./db/levels.sqlite');
    var usermention = message.mentions.members.first();

    if (!usermention) {
        var req = message.author;
        var phrase = 'You\'re';
    } else if (usermention) {
        var req = usermention.user;
        var phrase = `${req.username} is`;
    }

    sql.get(`SELECT * FROM levels WHERE ID ="${req.id}"`).then((row) => {

        var curLevelp = 0.1 * Math.sqrt(row.points + 1);
        var curLevel = Math.floor(curLevelp);
        var total = curLevelp / row.level;
        var points = total <= 0.2 ? '`🔸🔸🔸🔸🔸🔸🔸🔸`' : total <= 0.3 ? '`🔹🔸🔸🔸🔸🔸🔸🔸`' : total <= 0.4 ? '`🔹🔹🔸🔸🔸🔸🔸🔸`' : total <= 0.5 ? '`🔹🔹🔹🔸🔸🔸🔸🔸`' : total <= 0.6 ? '`🔹🔹🔹🔹🔸🔸🔸🔸`' : total <= 0.7 ? '`🔹🔹🔹🔹🔹🔸🔸🔸`' : total <= 0.8 ? '`🔹🔹🔹🔹🔹🔹🔸🔸`' : total <= 0.9 ? '`🔹🔹🔹🔹🔹🔹🔹🔸`' : total <= 1 ? '`🔹🔹🔹🔹🔹🔹🔹🔹`' : `¯\_(ツ)_/¯`;

            const LevelEmbed = new Discord.RichEmbed()
                .setColor('FF0000')
                .setAuthor(req.username, req.avatarURL)
                .addField(`\`📊\` **Level :**`, `${phrase} level **${row.level - 1}**`, false)
                .addField(`\`🔷\` Points :`, points, false);
            return message.channel.send(LevelEmbed);
    });
};
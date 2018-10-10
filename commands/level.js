const config = require('../storage/globalSettings.js');
const Discord = require('discord.js');
const sql = require('sqlite');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);
    
    sql.open('./storage/levels.sqlite');
    var member = message.mentions.members.first() || message.member;

    sql.get(`SELECT * FROM levels WHERE ID ="${member.user.id}"`).then((row) => {

        var curLevelp = 0.1 * Math.sqrt(row.points + 1);
        var curLevel = Math.floor(curLevelp);
        var total = curLevelp / row.level;
        var points = total <= 0.2 ? '`🔸🔸🔸🔸🔸🔸🔸🔸`' : total <= 0.3 ? '`🔹🔸🔸🔸🔸🔸🔸🔸`' : total <= 0.4 ? '`🔹🔹🔸🔸🔸🔸🔸🔸`' : total <= 0.5 ? '`🔹🔹🔹🔸🔸🔸🔸🔸`' : total <= 0.6 ? '`🔹🔹🔹🔹🔸🔸🔸🔸`' : total <= 0.7 ? '`🔹🔹🔹🔹🔹🔸🔸🔸`' : total <= 0.8 ? '`🔹🔹🔹🔹🔹🔹🔸🔸`' : total <= 0.9 ? '`🔹🔹🔹🔹🔹🔹🔹🔸`' : total <= 1 ? '`🔹🔹🔹🔹🔹🔹🔹🔹`' : `¯\_(ツ)_/¯`;

        const LevelEmbed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setAuthor(member.user.username, member.user.avatarURL)
            .addField(`\`📊\` **Level :**`, `${member.user.username} is level **${row.level - 1}**`, false)
            .addField(`\`🔷\` Points :`, points, false);
        return message.channel.send(LevelEmbed);
    });
};
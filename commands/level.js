const config = require('../config.js');
const Discord = require('discord.js');
const sql = require('sqlite');
exports.timer = '2seconds';
exports.run = (client, message) => {

    sql.open('./db/levels.sqlite')
    let usermention = message.mentions.members.first();

    let req = ''
    let phrase = ''
    if (!usermention) {
        req = message.author
        phrase = 'You\'re'
    } else if (usermention) {
        req = usermention.user
        phrase = `${req.username} is`
    }

    sql.get(`SELECT * FROM levels WHERE ID ="${req.id}"`).then((row) => {

        let curLevelp = 0.1 * Math.sqrt(row.points + 1);
        let curLevel = Math.floor(curLevelp)
        if (row.level - 1 <= 1) {
            if (curLevelp / row.level < 0.2) points = '`🔸🔸🔸🔸🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.3) points = '`🔹🔸🔸🔸🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.4) points = '`🔹🔹🔸🔸🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.5) points = '`🔹🔹🔹🔸🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.6) points = '`🔹🔹🔹🔹🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.7) points = '`🔹🔹🔹🔹🔹🔸🔸🔸`'
            else if (curLevelp / row.level < 0.8) points = '`🔹🔹🔹🔹🔹🔹🔸🔸`'
            else if (curLevelp / row.level < 0.9) points = '`🔹🔹🔹🔹🔹🔹🔹🔸`'
            else if (curLevelp / row.level >= 1) points = '`🔹🔹🔹🔹🔹🔹🔹🔹` (Next message)'
        } else if (row.level - 1 > 1) {
            if (curLevelp / row.level < 0.2) points = '🔸🔸🔸🔸🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.3) points = '`💠🔸🔸🔸🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.4) points = '`💠🔹🔸🔸🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.5) points = '`💠🔹🔹🔸🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.6) points = '`💠🔹🔹🔹🔸🔸🔸🔸`'
            else if (curLevelp / row.level < 0.7) points = '`💠🔹🔹🔹🔹🔸🔸🔸`'
            else if (curLevelp / row.level < 0.8) points = '`💠🔹🔹🔹🔹🔹🔸🔸`'
            else if (curLevelp / row.level < 0.9) points = '`💠🔹🔹🔹🔹🔹🔹🔸`'
            else if (curLevelp / row.level >= 1) points = '`💠💠💠💠💠💠💠💠` (Next message)'
        } else points = '¯\_(ツ)_/¯'

        const level_embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setAuthor(req.username, req.avatarURL)
            .addField(`\`📊\` **Level :**`, `${phrase} level **${row.level - 1}**`, false)
            .addField(`\`🔷\` Points :`, points, false)
        message.channel.send(level_embed)
    })

}
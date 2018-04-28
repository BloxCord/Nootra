const Discord = require('discord.js');
const config = require('../config.js');
exports.timer = '2seconds';
exports.run = (client, message, args) => {
    let split = '|'
    var user = message.member
    if (message.author.id === config.admin || user.hasPermission('MENTION_EVERYONE')) {
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setAuthor('Poll command')
                .setColor('FF0000')
                .setTitle('Informations')
                .setDescription(`**Syntax** : Question ${split} Proposition 1 ${split} Proposition 2 ${split} Proposition 3 ${split} Proposition 4 ${split} Proposition 5 ${split} Proposition 6`)
            message.channel.send(embed);
            message.delete(2000);
            return;
        }

        args = args.join(' ').split(split);

        for (var i = 0; i < args.length; i++) args[i] = args[i].trim()
        message.delete(2000)
        const embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setAuthor(args[0], 'http://survation.com/wp-content/uploads/2016/09/polleverywherelogo.png')
            .setFooter(config.name, config.avatar)
            .setThumbnail('http://survation.com/wp-content/uploads/2016/09/polleverywherelogo.png')
            .setTimestamp()
        if (args[1]) embed.addField('Proposition n°1 :', args[1], true)
        if (args[2]) embed.addField('Proposition n°2 :', args[2], true)
        if (args[3]) embed.addField('Proposition n°3', args[3], true)
        if (args[4]) embed.addField('Proposition n°4', args[4], true)
        if (args[5]) embed.addField('Proposition n°5', args[5], true)
        if (args[6]) embed.addField('Proposition n°6', args[6], true)
        message.channel.send(embed).then(function react(message) {
            setTimeout(() => {
                if (args[1]) message.react('1⃣')
            }, 500)
            setTimeout(() => {
                if (args[2]) message.react('2⃣')
            }, 1000)
            setTimeout(() => {
                if (args[3]) message.react('3⃣')
            }, 1500)
            setTimeout(() => {
                if (args[4]) message.react('4⃣')
            }, 2000)
            setTimeout(() => {
                if (args[5]) message.react('5⃣')
            }, 2500)
            setTimeout(() => {
                if (args[6]) message.react('6⃣')
            }, 3000)
        })
    } else return message.reply("you don't have access to this command.exports.timer = (client) => ms('2seconds');exports.timer = (client) => ms('2seconds');")
}
const Discord = require('discord.js');
const config = require('../config.js');
exports.timer = '2seconds';
exports.run = (client, message, args, tools) => {
    
    let user = message.member
    let split = '|'

    if (message.author.id === config.admin || user.hasPermission('MENTION_EVERYONE')) {

        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setAuthor('Announce command', 'https://png.icons8.com/megaphone/office/100')
                .setColor('FF0000')
                .setTitle('Informations')
                .setDescription(`**Syntax** : Message ${split} everyone (true, false) ${split} Image (optionnal)`)
            message.channel.send(embed);
            message.delete(2000);
            return;
        }

        args = args.join(' ').split(split);

        for (let i = 0; i < args.length; i++) args[i] = args[i].trim()

        if (args[1] !== 'true') {
            const embed = new Discord.RichEmbed()
                .setAuthor('Announce command', 'https://png.icons8.com/megaphone/office/100')
                .setColor('FF0000')
                .setDescription(args[0])
                .setThumbnail(args[2])
            message.channel.send(embed)
            message.delete(2000);
        }

        if (args[1] === 'true') {
            const embed = new Discord.RichEmbed()
                .setAuthor('Announce command', 'https://png.icons8.com/megaphone/office/100')
                .setColor('FF0000')
                .addField(args[0], '________')
                .setThumbnail(args[2])
            message.channel.send(embed)
            message.channel.send('@everyone')
            message.delete(2000);
        }
    } else return message.reply("you don't have access to this command.")
}
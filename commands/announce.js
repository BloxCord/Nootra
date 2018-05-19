const Discord = require('discord.js');
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args, tools) => {
    message ? message.delete(2000) : message;
    var user = message.member;
    var split = '|';

    if (message.author.id === config.admin || user.hasPermission('MENTION_EVERYONE')) {
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setAuthor('Announce command', 'https://png.icons8.com/megaphone/office/100')
                .setColor('FF0000')
                .setTitle('Informations')
                .setDescription(`**Syntax :** ${config.prefix}announce Message ${split} everyone (true, false) ${split} Image (optionnal)`);
            return message.channel.send(embed);
        } else {

            args = args.join(' ').split(split);
            global.trim(args);
            const embed = new Discord.RichEmbed()
                .setAuthor('Announce command', 'https://png.icons8.com/megaphone/office/100')
                .setColor('FF0000')
                .setDescription(args[0])
                .setThumbnail(args[2]);
            message.channel.send(embed);
            args[1] === 'true' ? message.channel.send('@everyone') : args[1] !== "true";
        }
    } else {
        return message.reply("you don't have access to this command.");
    }
};
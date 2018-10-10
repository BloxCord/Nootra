const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const global = require('../function/global.js');
const fs = require('fs');

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    if (message.author.id === config.admin || message.member.hasPermission('MENTION_EVERYONE')) {

        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setAuthor('Announce command', 'https://png.icons8.com/megaphone/office/100')
                .setColor('FF0000')
                .setTitle('Informations')
                .setDescription(`**Syntax :** ${serverSettings[message.guild.id].prefix}announce Message | everyone (true, false) | Image (optionnal)`);
            return message.channel.send(embed);
        } else {
            
            args = args.join(' ').split('|');
            global.trim(args);

            const embed = new Discord.RichEmbed()
                .setAuthor('Announce command', 'https://png.icons8.com/megaphone/office/100')
                .setColor('FF0000')
                .setDescription(args[0])
                .setThumbnail(args[2]);
            args[1] === 'true' ? message.channel.send('@everyone') : args[1];
            return message.channel.send(embed);
        }
    } else {
        return message.reply("you don't have access to this command.");
    }
};
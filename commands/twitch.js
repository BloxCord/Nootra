const Discord = require('discord.js');
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '10seconds';
exports.run = (client, message, args) => {
    message ? message.delete(2000) : message;
    let split = '|';
    var user = message.member;

    if (message.author.id === config.admin || user.hasPermission('MENTION_EVERYONE')) {
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setAuthor('Twitch command', 'https://png.icons8.com/dusk/512/000000/twitch.png')
                .setColor('FF0000')
                .setTitle('Informations')
                .setDescription(`**Syntax** : Twitch channel ${split} Channel link ${split} Game ${split} Date ${split} everyone (true, false) ${split} Image (optionnal)`);
            return message.channel.send(embed);
        } else {

            args = args.join(' ').split(split);

            global.trim(args);

            const embed = new Discord.RichEmbed()
                .setAuthor('Twitch command', 'https://png.icons8.com/dusk/512/000000/twitch.png')
                .setColor('FF0000')
                .setTitle(args[0])
                .setDescription(`\n**__Link :__** \n ${args[1]}\n\n**__Game :__** \n ${args[2]}\n\n**__Date :__** \n ${args[3]} `)
                .setThumbnail(args[5]);
            message.channel.send(embed);
            args[4] === 'true' ? message.channel.send('@everyone') : args[4] !== "true";
        }
    } else {
        return message.reply("you don't have access to this command.");
    }
};
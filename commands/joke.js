const Discord = require('discord.js');
const config = require('../config.js');
const superagent = require('superagent');

exports.timer = '2seconds';
exports.run = async (client, message) => {
    var {
        body
    } = await superagent
        .get('https://icanhazdadjoke.com/slack');

    const embed = new Discord.RichEmbed()
        .setAuthor('Dad joke', 'https://cdn.discordapp.com/attachments/418723354963476500/440189682098110465/flat800x800075f.jpg.png')
        .setColor('FF0000')
        .setDescription(body.attachments.map((a) => a.text))
        .setFooter(config.name, config.avatar);
message ? message.delete(2000) : message;
    return message.channel.send(embed);
};
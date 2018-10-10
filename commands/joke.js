const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const superagent = require('superagent');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = async (client, message, args) => {

    global.del(message, 5000);
    try {
        var {
            body
        } = await superagent
            .get('https://icanhazdadjoke.com/slack');

        const embed = new Discord.RichEmbed()
            .setAuthor('Dad joke', 'https://cdn.discordapp.com/attachments/418723354963476500/440189682098110465/flat800x800075f.jpg.png')
            .setColor('FF0000')
            .setDescription(body.attachments.map((a) => a.text));
        return message.channel.send(embed);
    } catch (error) {

    }

};
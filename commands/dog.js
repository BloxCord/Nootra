const Discord = require('discord.js');
const config = require('../config.js');
const superagent = require('superagent');

exports.timer = '2seconds';
exports.run = async (client, message) => {
    var {
        body
    } = await superagent
        .get('https://random.dog/woof.json');

    const embed = new Discord.RichEmbed()
        .setAuthor('Random Doggo', 'https://png.icons8.com/dog/dusk/50')
        .setColor('FF0000')
        .setDescription(`Nothing under me ? Direct link [here](${body.url}) !`)
        .setImage(body.url)
        .setFooter(config.name, config.avatar);

    return message.channel.send(embed);
};
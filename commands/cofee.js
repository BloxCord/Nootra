const Discord = require('discord.js');
const config = require('../config.js');
const superagent = require('superagent');

exports.timer = '2seconds';
exports.run = async (client, message) => {
    var {
        body
    } = await superagent
        .get('https://coffee.alexflipnote.xyz/random.json');

    var embed = new Discord.RichEmbed()
        .setAuthor('Random Cofee ☕')
        .setColor('FF0000')
        .setDescription(`
Nothing under me ? Direct link [here](${body.file}) !
(Great thanks to [AlexFlipnote](https://github.com/AlexFlipnote) for creating the API and letting me use it, here's his [website](https://alexflipnote.xyz/))
`)
        .setImage(body.file)
        .setFooter(config.name, config.avatar);

    return message.channel.send(embed);
};
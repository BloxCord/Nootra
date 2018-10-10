const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const superagent = require('superagent');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = async (client, message, args) => {

    global.del(message, 5000);

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
/*const Discord = require('discord.js');
const config = require('../config.js');
const superagent = require('superagent');

exports.timer = '10seconds';
exports.run = async (client, message) => {
    let { body } = await superagent
        .get('https://aws.random.cat/meow')
    console.log(body.url)

    let embed = new Discord.RichEmbed()
        .setAuthor('Random incarnation of the devil', 'https://png.icons8.com/cat_profile/dusk/50')
        .setColor('FF0000')
        .setImage(body.file)
        .setFooter(config.name, config.avatar)

    message.channel.send(embed)
}*/
const Discord = require('discord.js');
const config = require('../config.js');
const superagent = require('superagent');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = async (client, message, args) => {

    global.del(message, 5000);
    try {
        var {
            body
        } = await superagent
            .get('https://aws.random.cat/meow');

        const embed = new Discord.RichEmbed()
            .setAuthor('Random incarnation of the devil', 'https://png.icons8.com/cat_profile/dusk/50')
            .setDescription(`Nothing under me ? Direct link [here](${body.file}) !`)
            .setColor('FF0000')
            .setImage(body.file);
        return message.channel.send(embed);
    } catch (error) {
        return;
    }

};
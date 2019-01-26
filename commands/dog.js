const Discord = require('discord.js');
const superagent = require('superagent');
const global = require('../function/global.js');

module.exports = {
    name: 'dog',
    description: '',
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: 'fun',
    help: '',
    cooldown: 5,
    async execute(client, message, args) {
        global.del(message, 5000);
        try {
            var {
                body
            } = await superagent.get('https://random.dog/woof.json');

            const embed = new Discord.RichEmbed()
                .setAuthor('Random Doggo', 'https://png.icons8.com/dog/dusk/50')
                .setColor('FF0000')
                .setDescription(`Nothing under me ? Direct link [here](${body.url}) !`)
                .setImage(body.url);
            return message.channel.send(embed);
        } catch (error) {

        }
    }
};
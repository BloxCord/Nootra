const config = require('../config.js');
const Discord = require('discord.js');
const fs = require('fs');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    if (message.author.id === config.admin) {
        if (!args) {
            return message.reply("Please specify a command to reload");
        }

        try {
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            return message.channel.send(new Discord.RichEmbed().setDescription(`'${args[0]}' command reloaded \`✅\``).setColor('FF0000'));
        } catch (error) {
            message.reply(error.toString());
        }
    }

};
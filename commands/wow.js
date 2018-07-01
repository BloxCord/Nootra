const Discord = require("discord.js");
const global = require('../function/global.js');

exports.timer = '1minute';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);

    message.channel.send({
        file: 'https://cdn.discordapp.com/attachments/418723354963476500/423572460231720970/mlg-wow-gif-6.gif'
    });
};
const Discord = require("discord.js");
exports.timer = '1minute';
exports.run = (client, message) => {
    // Var
    var msg = message.content;
    var channel = message.channel;

    message.delete(2000);
    channel.send({
        file: 'https://cdn.discordapp.com/attachments/418723354963476500/423572460231720970/mlg-wow-gif-6.gif'
    })
}
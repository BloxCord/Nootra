const Discord = require("discord.js");
config = require('../config.js');
exports.timer = '2seconds';
exports.run = (client, message) => {
    
    let msg = message.content;
    let channel = message.channel;
    let result = Math.floor((Math.random() * 2) + 1);
    // Command
    const args = msg.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let content = args.join(' ');

    if (result == 1) {
        channel.send("HEAD !");
    } else if (result == 2) {
        channel.send("TAIL !");
    } else {
        channel.send('ERROR..');
        channel.send({
            file: 'https://cdn.discordapp.com/attachments/418723354963476500/421960243262783489/154810.png'
        });
    };
}
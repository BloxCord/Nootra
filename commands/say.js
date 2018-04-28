const Discord = require("discord.js");
config = require('../config.js');
exports.timer = '4seconds';
exports.run = (client, message) => {
    // Var
    var msg = message.content;
    var channel = message.channel;
    // Command
    const args = msg.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var content = args.join(' ');
    var user = message.member
    if (message.author.id === config.admin || user.hasPermission('MANAGE_MESSAGES')) {
        channel.send(content);
        message.delete();
    } else return message.reply("you don't have access to this command.")
}
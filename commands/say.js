const Discord = require("discord.js");
const config = require('../config.js');

exports.timer = '4seconds';
exports.run = (client, message, args) => {
    message ? message.delete(2000) : message;
    var msg = message.content;
    var content = args.join(' ');
    var user = message.member;

    if (message.author.id === config.admin || user.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send(content);
    } else {
        return message.reply("you don't have access to this command.");
    }
};
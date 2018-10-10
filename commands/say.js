const Discord = require("discord.js");
const config = require('../storage/globalSettings.js');
const global = require('../function/global.js');

exports.timer = '4seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    
    var msg = message.content;
    var content = args.join(' ');
    var user = message.member;

    if (message.author.id === config.admin || user.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send(content);
    } else {
        return message.reply("you don't have access to this command.");
    }
};
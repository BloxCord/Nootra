const config = require('../storage/globalSettings.js');
const Discord = require('discord.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    
    var msg = message.content;
    var content = args.join(' ');
    var UserMention = message.mentions.members.first();
    var user = message.member;

    if (message.author.id === config.admin || (user.hasPermission('MANAGE_NICKNAMES'))) {
        message.guild.members.get(UserMention.id).setNickname(content.replace(UserMention, ''));
    } else {
        return message.reply("you don't have access to this command.");
    }
};
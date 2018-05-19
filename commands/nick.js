const config = require('../config.js');
const Discord = require('discord.js');
exports.timer = '2seconds';
exports.run = (client, message) => {
message ? message.delete(2000) : message;
    var msg = message.content;
    // Command
    const args = msg.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var content = args.join(' ');
    var UserMention = message.mentions.members.first();
    var user = message.member;

    if (message.author.id === config.admin || (user.hasPermission('MANAGE_NICKNAMES'))) {
        message.guild.members.get(UserMention.id).setNickname(content.replace(UserMention, ''));
    } else {
        return message.reply("you don't have access to this command.");
    }
};
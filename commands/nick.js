const config = require('../config.js');
const Discord = require('discord.js');
exports.timer = '2seconds';
exports.run = (client, message) => {
    
    let msg = message.content
    // Command
    const args = msg.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let content = args.join(' ');
    let user_mention = message.mentions.members.first()
    let user = message.member

    if (message.author.id === config.admin || (user.hasPermission('MANAGE_NICKNAMES'))) {
        message.guild.members.get(user_mention.id).setNickname(content.replace(user_mention, ''));
        message.delete(2000)
    } else return message.reply("you don't have access to this command.")
}
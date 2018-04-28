const config = require('../config.js');
const discord = require('discord.js');
exports.timer = '1seconds';
exports.run = (client, message) => {
    // Var
    var msg = message.content;
    var author = message.author;
    const GuildMember = message.member;
    // Command
    const args = msg.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var content = args.join(' ');
    var role = message.guild.roles.find('name', content);

    message.delete();
    if (author.id === config.admin) GuildMember.addRole(role);
}
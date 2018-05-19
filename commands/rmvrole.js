const config = require('../config.js');
const discord = require('discord.js');
exports.timer = '1seconds';
exports.run = (client, message, args) => {
message ? message.delete(2000) : message;
    var msg = message.content;
    var author = message.author;
    const GuildMember = message.member;
    var content = args.join(' ');
    var role = message.guild.roles.find('name', content);

    if (author.id === config.admin) {
        GuildMember.removeRole(role);
    }
};
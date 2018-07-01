const config = require('../config.js');
const discord = require('discord.js');
const global = require('../function/global.js');

exports.timer = '1seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);
    var msg = message.content;
    var author = message.author;
    const GuildMember = message.member;
    var content = args.join(' ');
    var role = message.guild.roles.find('name', content);

    if (author.id === config.admin) {
        try {
            GuildMember.addRole(role);
        } catch (error) {
            return;
        }
    }
};
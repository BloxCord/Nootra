const Discord = require('discord.js');
const config = require('../config.js');

exports.timer = '2seconds';
exports.run = (client, message) => {

    var msg = message.content;
    // Command
    const args = msg.slice(config.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    var content = args.join(' ');
    var user = message.member;

    if (message.author.id === config.admin || user.hasPermission('MANAGE_ROLES')) {
        message.delete(2000);
        var ColorServ = message.guild;
        var roleid = args[0].split('<@&').pop().split('>');
        var ColorRole = ColorServ.roles.find("id", roleid[0]);

        ColorRole.setColor(args[1]);
    } else {
        return message.reply("you don't have access to this command.");
    }
};
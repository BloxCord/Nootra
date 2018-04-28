const Discord = require('discord.js');
const config = require('../config.js');
exports.timer = '2seconds';
exports.run = (client, message) => {
    
    let msg = message.content;
    // Command
    const args = msg.slice(config.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    let content = args.join(' ');
    let user = message.member

    if (message.author.id === config.admin || user.hasPermission('MANAGE_ROLES')) {
        message.delete(2000);
        let color_serv = message.guild;
        let roleid = args[0].split('<@&').pop().split('>');
        let color_role = color_serv.roles.find("id", roleid[0]);
        
        rainbow_role.setColor(args[1]);
    } else return message.reply("you don't have access to this command.")
}
const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    if (message.author.id === config.admin || message.member.hasPermission('MANAGE_ROLES')) {
        try {
            var colorServer = message.guild;
            var roleId = args[0].split('<@&').pop().split('>');
            var ColorRole = colorServer.roles.find((role) => role.id === roleId[0]);

            ColorRole.setColor(args[1]);
        } catch (error) {
            message.reply('couldn\'t change the color of this role.');
        }
    } else {
        return message.reply("you don't have access to this command.");
    }
};
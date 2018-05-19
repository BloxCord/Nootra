const Discord = require('discord.js');
const config = require('../config.js');
const ms = require('ms');
const espion = require('../function/espion.js');

exports.timer = '2seconds';
exports.run = async (client, message, args) => {
message ? message.delete(2000) : message;
    var usermention = message.mentions.members.first();
    var muterole = message.guild.roles.find('name', "mute");
    var user = message.member;

    if (message.author.id === config.admin || user.hasPermission('MUTE_MEMBERS')) {
        if (!usermention) {
            return message.reply(`couldn't find this user, please do ${config.prefix}tempmute @mention time`);
        }
        if (!usermention.roles.find('name', 'mute')) {
            return message.reply(`${usermention.user.username} is not muted`);
        }
        if (usermention.hasPermission("MUTE_MEMBERS")) {
            return message.reply(`can't mute, too powerful`);
        }
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "mute",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (error) {
                espion.new_error(client, error);
            }
        }

        await (usermention.removeRole(muterole.id));
        message.channel.send(`${usermention.user.username} was unmuted by ${message.author.username}.`);

    } else {
        return message.reply("you don't have access to this command.");
    }
};
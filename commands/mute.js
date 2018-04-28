const Discord = require('discord.js');
const config = require('../config.js')
const ms = require('ms');
const espion = require('../function/espion.js');
exports.timer = '2seconds';
exports.run = async (client, message, args) => {

    let usermention = message.mentions.members.first();
    let user = message.member;
    let muterole = message.guild.roles.find('name', "mute");
    if (message.author.id === config.admin || user.hasPermission('MUTE_MEMBERS')) {
        if (!usermention) return message.reply(`couldn't find this user, please do ${config.prefix}mute @mention`);
        if (usermention.id === config.admin || usermention.id === config.id) return;
        if (usermention.hasPermission("MUTE_MEMBERS")) return message.reply(`can't mute, too powerful`);
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "mute",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
            } catch (error) {
                espion.new_error(client, error)
            }
        }

        await (usermention.addRole(muterole.id))
        message.channel.send(`${usermention.user.username} was muted by ${message.author.username}.`)
    } else return message.reply("you don't have access to this command.")
}
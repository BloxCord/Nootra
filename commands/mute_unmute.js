const logger = require('../function/logger.js');
const global = require('../function/global.js');
const fs = require('fs');

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));

module.exports = {
    name: 'unmute',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: ['MUTE_MEMBERS'],
    type: 'moderation',
    help: '',
    cooldown: 5,
    async execute(client, message, args) {
        global.del(message, 5000);

        var usermention = message.mentions.members.first();
        var muteRole = message.guild.roles.find((role) => role.name === 'mute');
        var user = message.member;
        if (!usermention) {
            return message.reply(`couldn't find this user, please do ${serverSettings[message.guild.id].prefix}tempmute @mention time`);
        }
        if (!usermention.roles.find((role) => role.name === 'mute')) {
            return message.reply(`${usermention.user.username} is not muted`);
        }
        if (usermention.hasPermission("MUTE_MEMBERS")) {
            return message.reply(`can't mute, too powerful`);
        }
        if (!muteRole) {
            try {
                muteRole = await message.guild.createRole({
                    name: "mute",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (error) {
                logger.newError(client, error, __filename);
            }
        }

        await (usermention.removeRole(muteRole.id));
        message.channel.send(`${usermention.user.username} was unmuted by ${message.author.username}.`);
    }
};
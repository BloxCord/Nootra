const Discord = require('discord.js');
const config = require('../config.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    var guild = client.guilds.find('id', args[1]);
    if (args[2]) {
        var ContactMessage = args.join(' ').split(args[0]).pop().split(args[1]).pop().trim();
    }

    if (message.author.id === config.admin) {
        if (args[0] === 'leave') {
            guild.leave();
        } else if (args[0] === 'info') {
            const InfoEmbed = new Discord.RichEmbed()
                .setColor('FF0000')
                .setAuthor(`${guild.name}, Informations`, 'https://png.icons8.com/information/dusk/50')
                .setThumbnail(guild.iconURL)
                .setFooter(`Owner: ${guild.owner.user.tag}`, guild.owner.user.avatarURL)
                .addField('Members counter (<:online:435603484616818708>) :', guild.members.filter((m) => m.presence.status === 'online').size, true)
                .addField('Members counter (<:offline:435603483903655936>) :', guild.members.filter((m) => m.presence.status === 'offline').size, true)
                .addField('Channels counter (🔊) :', guild.channels.filter((chan) => chan.type === 'voice').size, true)
                .addField('Channels counter (<a:typing:436602781155983372>) :', guild.channels.filter((chan) => chan.type === 'text').size, true)
                .addField('Roles list (Name (ID)) :', guild.roles.map((role) => `\`${role.name} (${role.id})\``).join('\n'), false)
                .addField('Channels list (Name (ID)) :', guild.channels.map((channels) => `\`${channels.name} (${channels.id})\``).join('\n'), false);
            message.channel.send(InfoEmbed);
        } else {
            return message.reply('leave/info');
        }
    } else {
        return message.reply("this command is restricted.");
    }
};
const Discord = require('discord.js');
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);
    
    if (args[0] === 'info') {
        const ServerinfoEmbed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setAuthor(`${message.guild.name}, Informations`, 'https://png.icons8.com/information/dusk/50')
            .setThumbnail(message.guild.iconURL)
            .setFooter(`Owner: ${message.guild.owner.user.tag}`, message.guild.owner.user.avatarURL)
            .addField('Members counter (<:online:435603484616818708>) :', message.guild.members.filter((m) => m.presence.status === 'online').size, true)
            .addField('Members counter (<:offline:435603483903655936>) :', message.guild.members.filter((m) => m.presence.status === 'offline').size, true)
            .addField('Channels counter (🔊) :', message.guild.channels.filter((chan) => chan.type === 'voice').size, true)
            .addField('Channels counter (<a:typing:436602781155983372>) :', message.guild.channels.filter((chan) => chan.type === 'text').size, true)
            .addField('Roles list (Name (ID)) :', message.guild.roles.map((role) => `\`${role.name} (${role.id})\``).join('\n'), true);
        //.addField('Channels list :', message.guild.channels.map(channels => channels.name).join('\n'))
        message.channel.send(ServerinfoEmbed);
    } else if (args[0] === 'emojis') {
        const emojiList = message.guild.emojis.map((e) => e.toString()).join(" ");
        if (!emojiList) {
            const embed = new Discord.RichEmbed()
                .setColor('FF0000')
                .setDescription(`${message.guild.name} doesn't have emojis`);
            message.author.send(embed);
        } else {
            const embed = new Discord.RichEmbed()
                .setColor('FF0000')
                .setAuthor(`Emojis from "${message.guild.name}"`)
                .setDescription(emojiList);
            message.channel.send(embed);
        }
    } else if (args[0] === 'invite') {
        try {
            message.channel.createInvite()
                .then((invite) => {
                    message.channel.send(`Invitation for #${message.channel.name} : <${invite.url}>`);
                });
        } catch (error) {
            return;
        }
    } else {
        return;
    }
};
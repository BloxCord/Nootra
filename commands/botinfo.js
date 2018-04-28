const config = require('../config.js');
const Discord = require('discord.js');

exports.timer = '2seconds'
exports.run = (client, message) => {

    let status = client.users.get(config.id).presence.status
    let status_emoji = ''
    if (status === 'online') status_emoji = 'https://cdn.discordapp.com/emojis/435603484616818708.png'
    else if (status === 'dnd') status_emoji = 'https://cdn.discordapp.com/emojis/435603483140292609.png'
    else if (status === 'idle') status_emoji = 'https://cdn.discordapp.com/emojis/435603483173978123.png'
    else if (status === 'offline') status_emoji = 'https://cdn.discordapp.com/emojis/435603483903655936.png'
    else status_emoji = 'https://cdn.discordapp.com/emojis/435603483627094026.png'
    let tag = client.users.find('id', config.admin).tag

    const bot_embed = new Discord.RichEmbed()
    .setColor('FF0000')
    .setAuthor(`${config.name} informations`, config.avatar)
    .addField('Server count:', client.guilds.size, true)
    .addField('Users count:', client.users.size, true)
    .addField('Creator:', tag, true)
    .addField('Version:', `${config.version}`, true)
    .addField('Language:', 'Javascript', true)
    .addField('Library:', `[discord.js](http://discord.js.org/)`, true)
    .setFooter(`Status : ${status}`, status_emoji)
    
    message.channel.send(bot_embed)
}
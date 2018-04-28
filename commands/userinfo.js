const Discord = require("discord.js");
const config = require('../config.js');
exports.timer = '10seconds';
exports.run = (client, message, args) => {
    // Var
    var msg = message.content;
    var channel = message.channel;
    var msgmention = message.mentions.members.first();
    var datecrea = msgmention.user.createdAt.toString().split(' ');
    var emoji_status = ''
    if (msgmention.user.presence.status === 'online') emoji_status = '<:online:435603484616818708>'
    if (msgmention.user.presence.status === 'dnd') emoji_status = '<:dnd:435603483140292609>'
    if (msgmention.user.presence.status === 'idle') emoji_status = '<:idle:435603483173978123>'
    if (msgmention.user.presence.status === 'invisible' && msgmention.user.presence.status === 'offline') emoji_status = '<:offline:435603483903655936>'

    const info_embed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setAuthor('Userinfo command', 'https://png.icons8.com/information/dusk/50')
        .addField('Username :', msgmention.user.username, false)
        .addField('ID :', msgmention.user.id, false)
        .addField('Created on :', `${datecrea[1]} ${datecrea[2]} ${datecrea[3]} ${datecrea[4]}`, false)
        .addField('Status :', emoji_status, false)
        .setFooter(msgmention.user.username, msgmention.user.avatarURL)
    channel.send(info_embed);
    message.delete(2000);
}
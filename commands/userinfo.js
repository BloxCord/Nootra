const Discord = require("discord.js");
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '10seconds';
exports.run = (client, message, args) => {
    message ? message.delete(2000) : message;
    var msgmention = message.mentions.members.first();
    var datecrea = msgmention.user.createdAt.toString().split(' ');
    var status = msgmention.user.presence.status;
    var StatusEmoji = status === 'online' ? 'https://cdn.discordapp.com/emojis/435603484616818708.png' : status === 'dnd' ? 'https://cdn.discordapp.com/emojis/435603483140292609.png' : status === 'idle' ? 'https://cdn.discordapp.com/emojis/435603483173978123.png' : 'https://cdn.discordapp.com/emojis/435603483627094026.png';

    const InfoEmbed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setAuthor('Userinfo command', 'https://png.icons8.com/information/dusk/50')
        .addField('Username :', msgmention.user.username, false)
        .addField('ID :', msgmention.user.id, false)
        .addField('Created account on :', `${datecrea[1]} ${datecrea[2]} ${datecrea[3]} ${datecrea[4]}`, false)
        .setThumbnail(msgmention.user.avatarURL)
        .setFooter(`Status : ${global.capitalizeArg(status)}`, StatusEmoji);
    message.channel.send(InfoEmbed);
};
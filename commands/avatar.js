const Discord = require("discord.js");
const config = require('../config.js');

exports.timer = '5seconds';
exports.run = (client, message) => {

    var msg = message.content;
    var channel = message.channel;
    var usermention = message.mentions.members.first();

    const AvatarEmbed = new Discord.RichEmbed()
        .setDescription(`Direct link [here](${usermention.user.avatarURL})`)
        .setAuthor(`${usermention.user.username} avatar :`, 'http://png.icons8.com/customer/office/512')
        .setColor('FF0000')
        .setImage(usermention.user.avatarURL);
    channel.send(AvatarEmbed);
    message ? message.delete(2000) : message;
};
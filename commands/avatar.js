const Discord = require("discord.js");
const config = require('../config.js');
exports.timer = '5seconds';
exports.run = (client, message) => {
    
    let msg = message.content;
    let channel = message.channel;
    let usermention = message.mentions.members.first();
    
    const avatar_embed = new Discord.RichEmbed()
        .setDescription(`Direct link [here](${usermention.user.avatarURL})`)
        .setAuthor(`${usermention.user.username} avatar :`, 'http://png.icons8.com/customer/office/512')
        .setColor('FF0000')
        .setImage(usermention.user.avatarURL)
    channel.send(avatar_embed);
    message.delete(2000);
}
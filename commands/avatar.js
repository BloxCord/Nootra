const Discord = require("discord.js");
const config = require('../storage/globalSettings.js');
const global = require('../function/global.js');

exports.timer = '5seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);
    
    var usermention = message.mentions.members.first();

    const embed = new Discord.RichEmbed()
        .setDescription(`Direct link [here](${usermention.user.avatarURL})`)
        .setAuthor(`${usermention.user.username} avatar :`, 'http://png.icons8.com/customer/office/512')
        .setColor('FF0000')
        .setImage(usermention.user.avatarURL);
    message.channel.send(embed);
};
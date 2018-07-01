const Discord = require("discord.js");
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);
    var UserMention = message.mentions.members.first();
    var user = message.member;

    if (message.author.id === config.admin || user.hasPermission('KICK_MEMBERS')) {
        UserMention.kick();
        const embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setDescription(`${UserMention.user.username} was kicked from the server. <:banhammer:437319363352330250>`);
        return message.channel.send(embed);
    } else {
        return message.reply("you don't have access to this command.");
    }
};
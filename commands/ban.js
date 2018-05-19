const Discord = require("discord.js");
const config = require('../config.js');

exports.timer = '2seconds';
exports.run = (client, message) => {

    var UserMention = message.mentions.members.first();
    var user = message.member;

    if (message.author.id === config.admin || user.hasPermission('BAN_MEMBERS')) {
        UserMention.ban();
        const embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setDescription(`${UserMention.user.username} was banned from the server. <:banhammer:437319363352330250>`);
        message.channel.send(embed);
    } else {
        return message.reply("you don't have access to this command.");
    }
    message ? message.delete(2000) : message;
};
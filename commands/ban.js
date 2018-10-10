const Discord = require("discord.js");
const config = require('../storage/globalSettings.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    var userMention = message.mentions.members.first();

    if (message.author.id === config.admin || message.member.hasPermission('BAN_MEMBERS')) {
        userMention.ban();

        const embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setDescription(`${userMention.user.username} was banned from the server. <:banhammer:437319363352330250>`);
        return message.channel.send(embed);
    } else {
        return message.reply("you don't have access to this command.");
    }
};
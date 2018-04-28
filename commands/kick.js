const Discord = require("discord.js");
config = require('../config.js');

exports.timer = '2seconds';
exports.run = (client, message) => {

    let user_mention = message.mentions.members.first();
    let user = message.member

    if (message.author.id === config.admin || user.hasPermission('KICK_MEMBERS')) {
        user_mention.kick();
        const embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setDescription(`${user_mention.user.username} was kicked from the server. <:banhammer:437319363352330250>`)
        message.channel.send(embed);
    } else return message.reply("you don't have access to this command.")
    message.delete(2000);
}
const Discord = require("discord.js");
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {


};

module.exports = {
    name: 'ban',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: ["BAN_MEMBERS"],
    type: 'moderation',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        global.del(message, 5000);
        var userMention = message.mentions.members.first();
        try {
            if (userMention) userMention.ban();
            const embed = new Discord.RichEmbed()
                .setColor('FF0000')
                .setDescription(`${userMention.user.username} was banned from the server. <:banhammer:437319363352330250>`);
            return message.channel.send(embed);
        } catch (error) {
            console.log(error);
            return message.reply(error);
        }
    }
};
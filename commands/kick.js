const Discord = require("discord.js");
const global = require("../function/global.js");

module.exports = {
    name: "kick",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: ["KICK_MEMBERS"],
    type: "moderation",
    help: "",
    cooldown: 5,
    execute(client, message, args) {

        message.delete(5000).catch(() => {
            return;
        });

        var userMention = message.mentions.members.first();
        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setDescription(`${userMention.user.username} was kicked from the server. <:banhammer:437319363352330250>`);
        userMention.kick().then(() => message.channel.send(embed)).catch(() => {
            return;
        });
    }
};
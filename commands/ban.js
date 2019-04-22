const Discord = require("discord.js");
const global = require("../function/global.js");

exports.timer = "2seconds";
exports.run = (client, message, args) => {


};

module.exports = {
    name: "ban",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: ["BAN_MEMBERS"],
    type: "moderation",
    help: "prefix + ban @mention",
    cooldown: 5,
    execute(client, message, args) {

        message.delete(5000).catch(() => {
            return;
        });

        var userMention = message.mentions.members.first();
        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setDescription(`${userMention.user.username} was banned from the server. <:banhammer:437319363352330250>`);
        userMention.ban().then(() => message.channel.send(embed)).catch(() => {
            return;
        });
    }
};
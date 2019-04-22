const Discord = require("discord.js");
const global = require("../function/global.js");

module.exports = {
    name: "userinfo",
    description: "",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "utility",
    help: "",
    cooldown: 5,
    execute(client, message, args) {
        
        message.delete(5000).catch(() => {
            return;
        });

        var userMention = message.mentions.members.first() || message.member;
        var datecrea = userMention.user.createdAt.toString().split(" ");
        var status = userMention.user.presence.status;
        var StatusEmoji = status === "online" ? "https://cdn.discordapp.com/emojis/435603484616818708.png" : status === "dnd" ? "https://cdn.discordapp.com/emojis/435603483140292609.png" : status === "idle" ? "https://cdn.discordapp.com/emojis/435603483173978123.png" : "https://cdn.discordapp.com/emojis/435603483627094026.png";

        const InfoEmbed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor("Userinfo command", "https://png.icons8.com/information/dusk/50")
            .addField("Username :", userMention.user.username, false)
            .addField("ID :", userMention.user.id, false)
            .addField("Created account on :", `${datecrea[1]} ${datecrea[2]} ${datecrea[3]} ${datecrea[4]}`, false)
            .setThumbnail(userMention.user.avatarURL)
            .setFooter(`Status : ${global.capitalizeArg(status)}`, StatusEmoji);
        message.channel.send(InfoEmbed);
    }
};
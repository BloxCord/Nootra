const Discord = require("discord.js");
const global = require("../function/global.js");
const fs = require("fs");

let serverSettings = JSON.parse(fs.readFileSync("./storage/serverSettings.json", "utf8"));
module.exports = {
    name: "emoji",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: ["MANAGE_EMOJIS"],
    type: "utility",
    help: "",
    cooldown: 5,
    execute(client, message, args) {

        message.delete(5000).catch(() => {
            return;
        });

        var emojiId = args[1].split(":").pop().split(">")[0] || args[1];
        var emoji = message.guild.emojis.find((emoji) => emoji.id === emojiId || emoji.name === args[1]) || null;

        const embed = new Discord.RichEmbed().setColor("FF0000");

        if (args[0] === "new" || args[0] === "add") {
            message.guild.createEmoji(args[1].trim(), args[2].trim()).then((newemoji) => {
                embed.addField(`New emoji added by ${message.author.username}`, `"${newemoji.name}" ${newemoji.toString()}`);
            }).catch((e) => {
                return;
            });
        } else if (args[0] === "del" || args[0] === "delete" || args[0] === "remove") {
            message.guild.deleteEmoji(emoji.id).then(() => {
                embed.addField(`Emoji deleted by ${message.author.username}`, `"${emoji.name}" ${emoji.toString()}`);
            }).catch(() => {
                return;
            });
        } else if (args[0] === "code" || args[0] === "string" || args[0] === "text") {
            embed.setDescription(`Emoji code for ${emoji.toString()} is **\\${emoji.toString()}**`);
        } else if (args[0] === "url") {
            embed.setDescription(`Emoji url for ${emoji.toString()} is **${emoji.url}**`);
        } else {
            return;
        }
        message.channel.send(embed);
    }
};
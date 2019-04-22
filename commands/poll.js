const Discord = require("discord.js");
const global = require("../function/global.js");

module.exports = {
    name: "poll",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: ["MENTION_EVERYONE"],
    type: "utility",
    help: "",
    cooldown: 5,
    execute(client, message, args) {

        message.delete(5000).catch(() => {
            return;
        });

        var split = "|";
        var user = message.member;
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setAuthor("Poll command")
                .setColor("FF0000")
                .setTitle("Informations")
                .setDescription(`**Syntax** : Question ${split} Proposition 1 ${split} Proposition 2 ${split} Proposition 3 ${split} Proposition 4 ${split} Proposition 5 ${split} Proposition 6`);
            return message.channel.send(embed);
        }

        args = args.join(" ").split(split);
        global.trim(args);

        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor(args[0])
            .setFooter(client.config.name, client.config.avatar)
            .setThumbnail("http://survation.com/wp-content/uploads/2016/09/polleverywherelogo.png")
            .setTimestamp();
        if (args[1]) {
            embed.addField("Proposition n°1 :", args[1], false);
        }
        if (args[2]) {
            embed.addField("Proposition n°2 :", args[2], false);
        }
        if (args[3]) {
            embed.addField("Proposition n°3", args[3], false);
        }
        if (args[4]) {
            embed.addField("Proposition n°4", args[4], false);
        }
        if (args[5]) {
            embed.addField("Proposition n°5", args[5], false);
        }
        if (args[6]) {
            embed.addField("Proposition n°6", args[6], false);
        }
        return message.channel.send(embed).then(async (message) => {
            if (args[1]) {
                await message.react("1⃣");
            }
            if (args[2]) {
                await message.react("2⃣");
            }
            if (args[3]) {
                await message.react("3⃣");
            }
            if (args[4]) {
                await message.react("4⃣");
            }
            if (args[5]) {
                await message.react("5⃣");
            }
            if (args[6]) {
                await message.react("6⃣");
            }
        });
    }
};
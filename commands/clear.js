const Discord = require("discord.js");
const config = require("../storage/globalSettings.js");
const global = require("../function/global.js");

module.exports = {
    name: "clear",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: ["MANAGE_MESSAGES"],
    type: "moderation",
    help: "prefix + clear 'number'",
    cooldown: 5,
    async execute(client, message, args) {
        if (isNaN(args[0])) {
            return message.reply("please use a valid number *between* 1 and 100");
        }
        if (Number(args[0]) < 1 || Number(args[0]) > 100) {
            return message.channel.send(`"**${args[0]}**" is not a valid number, please use a number *between* 1 and 100`);
        }
        const fetched = await message.channel.fetchMessages({
            limit: args[0]
        });

        message.channel.bulkDelete(fetched).then(() => {
            const embed = new Discord.RichEmbed()
                .setAuthor(`${fetched.size} message cleared !`)
                .setColor("FF0000")
                .setFooter(config.name, config.avatar)
                .setImage("https://png.icons8.com/trash_can/office/100")
                .setTimestamp();
            return message.channel.send(embed).then((msg) => {
                msg.delete(5000).catch(() => {
                    return;
                });
            });
        }).catch(() => {
            message.reply("Cannot delete messages [Missing permissions]").then((msg) => {
                msg.delete(2000).catch(() => {
                    return;
                });
            });
        });

    }
};
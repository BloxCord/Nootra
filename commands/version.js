const Discord = require("discord.js");
const config = require("../storage/globalSettings.js");
const pack = require("../package.json");
const global = require("../function/global.js");

module.exports = {
    name: "version",
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

        const VersionEmbed = new Discord.RichEmbed()
            .addField("Version :", `
    <:bot:436602778467696662> ${config.version}
    <:node:438739213786152981> ${pack.engines.node}
    <:npm:438739213039435776> ${pack.engines.npm}
    <:discordjs:438739213350076416> ${pack.dependencies["discord.js"]}
    `)
            .setColor("FF0000");
        message.channel.send(VersionEmbed);
    }
};
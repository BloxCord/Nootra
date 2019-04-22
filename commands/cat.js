const Discord = require("discord.js");
const superagent = require("superagent");
const global = require("../function/global.js");

module.exports = {
    name: "cat",
    description: "",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "fun",
    help: "prefix + cat",
    cooldown: 5,
    async execute(client, message, args) {
        
        message.delete(5000).catch(() => {
            return;
        });
        
        var {
            body
        } = await superagent
            .get("https://aws.random.cat/meow");

        const embed = new Discord.RichEmbed()
            .setAuthor("Random incarnation of the devil", "https://png.icons8.com/cat_profile/dusk/50")
            .setDescription(`Nothing under me ? Direct link [here](${body.file}) !`)
            .setColor("FF0000")
            .setImage(body.file);
        return message.channel.send(embed);
    }
};
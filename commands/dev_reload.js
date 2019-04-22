const Discord = require("discord.js");
const global = require("../function/global.js");

module.exports = {
    name: "reload",
    description: "",
    guildOnly: false,
    devOnly: true,
    perms: [],
    type: "dev",
    help: "prefix + reload 'commandFile'",
    cooldown: 5,
    execute(client, message, args) {
        
        message.delete(5000).catch(() => {
            return;
        });
        
        if (!args) {
            return message.reply("Please specify a command to reload");
        }

        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setDescription(`"${args[0]}" command reloaded \`✅\``);

        delete require.cache[require.resolve(`./${args[0]}.js`)];
        return message.channel.send(embed).catch((err) => console.log(err));
    }
};
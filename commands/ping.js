const Discord = require("discord.js");
const ms = require("ms");
const global = require("../function/global.js");

module.exports = {
    name: "ping",
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

        var quality = Math.round(client.ping) >= 150 ? "bad \`😑\`" : Math.round(client.ping) >= 100 ? "average \`😬\`" : "good \`😀\`";

        const PingEmbed = new Discord.RichEmbed()
            .addField("API Response time `🕑` : ", `${Math.round(client.ping)}ms, ${quality}`, false)
            .addField("Uptime `⌛` : ", `${ms(client.uptime, {long : true})}`, false)
            .addField("Connected the `📆` : ", `${global.connexionDate()}`, false)
            .setAuthor("Ping", "https://png.icons8.com/dusk/50/000000/speed.png")
            .setColor("FF0000")
            .setFooter(client.config.name, client.config.avatar);
        message.channel.send(PingEmbed);
    }
};
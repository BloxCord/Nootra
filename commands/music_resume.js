const Discord = require("discord.js");
const global = require("../function/global.js");
const config = require("../storage/globalSettings.js");

module.exports = {
    name: "resume",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: [],
    type: "music",
    help: "",
    cooldown: 5,
    async execute(client, message, args) {

        var queue = client.queue;
        var serverQueue = queue.get(message.guild.id);
        var memberRole = message.member.roles;

        message.delete(5000).catch(() => {
            return;
        });

        if (config.devs.includes(message.author.id) || memberRole.find((role) => role.name === "DJ")) {
            if (serverQueue && serverQueue.playing === false) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                const musicResume = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor("Resume", "https://png.icons8.com/resume_button/dusk/50")
                    .setDescription(`Stream resumed by ${message.author.username}`);
                return message.channel.send(musicResume);
            }
        }
    }
};
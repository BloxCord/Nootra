const Discord = require("discord.js");
const global = require("../function/global.js");
const ms = require("ms");

module.exports = {
    name: "queue",
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

        message.delete(5000).catch(() => {
            return;
        });

        if (!serverQueue) {
            return message.reply("nothing's playing.");
        }
        var number = 1;
        var page = 1;
        var shortArrays = global.arrayList(serverQueue.songs, 10);
        const musicQueue = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor("Queue", "https://png.icons8.com/sorting/dusk/50")
            .setDescription(`${shortArrays[page - 1].map((song) => `\`#${number++}\` : [${song.title}](${song.url}) **${ms(song.duration)}**`).join("\n")}\n`);
        if (shortArrays.length > 1) {
            musicQueue.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
        }
        message.channel.send(musicQueue).then((msg) => {
            if (shortArrays.length > 1) {
                msg.react("⏪").then(() => {
                    msg.react("🛑").then(() => msg.react("⏩"));
                });
            }

            msg.createReactionCollector((reaction) => reaction.emoji.name === "⏪", {
                time: ms("1day")
            }).on("collect", (r) => {
                r.remove(message.member.id);
                if (page === 1) {
                    return;
                }
                number = number - (10 + shortArrays[page - 1].length);
                page--;
                musicQueue.setDescription(`${shortArrays[page - 1].map((song) => `\`#${number++}\` : [${song.title}](${song.url}) **${ms(song.duration)}**`).join("\n")}\n`);
                musicQueue.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(musicQueue);
            });

            msg.createReactionCollector((reaction) => reaction.emoji.name === "⏩", {
                time: ms("1day")
            }).on("collect", (r) => {
                r.remove(message.member.id);
                if (page === shortArrays.length) {
                    return;
                }
                page++;
                musicQueue.setDescription(`${shortArrays[page - 1].map((song) => `\`#${number++}\` : [${song.title}](${song.url}) **${ms(song.duration)}**`).join("\n")}\n`);
                musicQueue.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(musicQueue);
            });

            msg.createReactionCollector((reaction) => reaction.emoji.name === "🛑", {
                time: ms("1day")
            }).on("collect", (r) => {
                r.remove(message.member.id);
                if (page === 1) {
                    return;
                }
                number = 1;
                page = 1;
                musicQueue.setDescription(`${shortArrays[page - 1].map((song) => `\`#${number++}\` : [${song.title}](${song.url}) **${ms(song.duration)}**`).join("\n")}\n`);
                musicQueue.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(musicQueue);
            });
        });
    }
};
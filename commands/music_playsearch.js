const Discord = require("discord.js");
const global = require("../function/global.js");
const YouTube = require("simple-youtube-api");

module.exports = {
    name: "playsearch",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: [],
    type: "music",
    help: "",
    cooldown: 5,
    async execute(client, message, args) {

        const youtube = new YouTube(client.config.apiYoutube);
        var voiceChannel = message.member.voiceChannel;
        var queue = client.queue;
        var searchString = args.join(" ");
        message.delete(5000).catch(() => {
            return;
        });

        try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;
            const musicSelection = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor("Song Selection", "https://png.icons8.com/play/dusk/50")
                .setDescription(`
${videos.map((video2) => `**${++index}** : \`${video2.title}\``).join("\n")}

Please provide a value to select one of the search results ranging from 1-10.        
`);
            message.channel.send(musicSelection).then((selectionmsg) => {
                selectionmsg.delete(22000).catch(() => {
                    return;
                });
            });
            try {
                var response = await message.channel.awaitMessages((msg2) => msg2.content >= 1 && msg2.content <= 10, {
                    maxMatches: 1,
                    time: 20000,
                    errors: ["time"]
                });
                const videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                response.first().delete().catch(() => {
                    return;
                });
                return global.handleVideo(client, queue, video, message, voiceChannel);
            } catch (error) {
                return message.channel.send("No or invalid value entered, cancelling video selection.").then(((msg) => {
                    msg.delete(2000).catch(() => {
                        return;
                    });
                }));
            }
        } catch (error) {
            return message.channel.send("🆘 I couldn\"t get any search results.").then((msg) => {
                msg.delete().catch(() => {
                    return;
                });
            });
        }
    }
};
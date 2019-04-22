const Discord = require("discord.js");
const global = require("../function/global.js");
const config = require("../storage/globalSettings.js");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(config.apiYoutube);

module.exports = {
    name: "play",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: [],
    type: "music",
    help: "",
    cooldown: 5,
    async execute(client, message, args) {

        var url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var voiceChannel = message.member.voiceChannel;
        var permissions = voiceChannel.permissionsFor(message.member);
        var queue = client.queue;
        var searchString = args.join(" ");
        
        var video;
        var playlist;
        var playlistVideo;
        var videos;
        var SearchedVideos;
        var SearchedVideo;

        message.delete(5000).catch(() => {
            return;
        });

        if (!voiceChannel) {
            return message.reply("you're not in a vocal channel.");
        }

        if (!permissions.has("CONNECT")) {
            return message.reply("I can't connect in this channel.");
        }
        if (!permissions.has("SPEAK")) {
            return message.reply("I can't talk in this channel.");
        }

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            playlist = await youtube.getPlaylist(url);
            videos = await playlist.getVideos();
            for (var videoValue of Object.values(videos)) {
                playlistVideo = await youtube.getVideoByID(videoValue.id);
                await global.handleVideo(client, queue, playlistVideo, message, voiceChannel, true);
            }
            const musicPlaylistAdd = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor("Play", "https://png.icons8.com/play/dusk/50")
                .setDescription(`Added "${playlist.title}" to queue!`);
            return message.channel.send(musicPlaylistAdd);
        } else {
            try {
                video = await youtube.getVideo(url);
            } catch (err) {
                try {
                    SearchedVideos = await youtube.searchVideos(searchString, 1);
                    SearchedVideo = await youtube.getVideoByID(SearchedVideos[0].id);
                } catch (error) {
                    return console.log(err);
                }
            }
            return global.handleVideo(client, queue, SearchedVideo, message, voiceChannel);
        }
    }
};
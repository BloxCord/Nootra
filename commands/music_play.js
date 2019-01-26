const Discord = require('discord.js');
const logger = require('../function/logger');
const global = require('../function/global.js');
const config = require('../storage/globalSettings.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(config.apiYoutube);

module.exports = {
    name: 'play',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: [],
    type: 'music',
    help: '',
    cooldown: 5,
    async execute(client, message, args) {

    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var voiceChannel = message.member.voiceChannel;
    var queue = client.queue;
    var searchString = args.join(" ");

        global.del(message, 5000);
        if (!voiceChannel) {
            return message.reply("you're not in a vocal channel.");
        }
        var permissions = voiceChannel.permissionsFor(message.member);

        if (!permissions.has('CONNECT')) {
            return message.reply("I can't connect in this channel.");
        }
        if (!permissions.has('SPEAK')) {
            return message.reply("I can't talk in this channel.");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            var playlist = await youtube.getPlaylist(url);
            var videos = await playlist.getVideos();
            for (var video of Object.values(videos)) {
                var video2 = await youtube.getVideoByID(video.id);
                await global.handleVideo(client, queue, video2, message, voiceChannel, true);
            }
            const musicPlaylistAdd = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Play', 'https://png.icons8.com/play/dusk/50')
                .setDescription(`Added "${playlist.title}" to queue!`);
            return message.channel.send(musicPlaylistAdd);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (error) {
                    return logger.newError(client, error, __filename);
                }
            }
            return global.handleVideo(client, queue, video, message, voiceChannel);
        }
    }
};
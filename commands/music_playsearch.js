const Discord = require('discord.js');
const global = require('../function/global.js');
const config = require('../storage/globalSettings.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(config.apiYoutube);

module.exports = {
    name: 'playsearch',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: [],
    type: 'music',
    help: '',
    cooldown: 5,
    async execute(client, message, args) {
        var voiceChannel = message.member.voiceChannel;
        var queue = client.queue;
        var searchString = args.join(" ");

        global.del(message, 5000);

        try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;
            const musicSelection = new Discord.RichEmbed()
                .setColor('FF0000')
                .setAuthor('Song Selection', 'https://png.icons8.com/play/dusk/50')
                .setDescription(`
${videos.map((video2) => `**${++index}** : \`${video2.title}\``).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.        
`);
            message.channel.send(musicSelection).then((selectionmsg) => {
                global.del(selectionmsg, 22000);
            });
            try {
                var response = await message.channel.awaitMessages((msg2) => msg2.content >= 1 && msg2.content <= 10, {
                    maxMatches: 1,
                    time: 20000,
                    errors: ['time']
                });
                const videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                global.del(response.first());
                return global.handleVideo(client, queue, video, message, voiceChannel);
            } catch (error) {
                return message.channel.send('No or invalid value entered, cancelling video selection.').then(((msg) => {
                    global.del(msg, 2000);
                }));
            }
        } catch (error) {
            return message.channel.send('🆘 I couldn\'t get any search results.').then((msg) => {
                global.del(msg, 2000);
            });
        }
    }
};
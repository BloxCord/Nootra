const Discord = require('discord.js');
const global = require('../function/global.js');

module.exports = {
    name: 'now',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: [],
    type: 'music',
    help: '',
    cooldown: 5,
    async execute(client, message, args) {

        var queue = client.queue;
        var serverQueue = queue.get(message.guild.id);

        global.del(message, 5000);
        if (!serverQueue) {
            return message.reply("nothing's playing.");
        }
        const musicNp = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Now', 'https://png.icons8.com/play/dusk/50')
            .addField('Now playing:', `${serverQueue.songs[0].title} \`🔊\``)
            .setImage(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/maxresdefault.jpg`, serverQueue.songs[0].url, 100, 100);
        return message.channel.send(musicNp);
    }
};
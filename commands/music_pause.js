const Discord = require('discord.js');
const global = require('../function/global.js');
const config = require('../storage/globalSettings.js');

module.exports = {
    name: 'pause',
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
        var memberRole = message.member.roles;

        global.del(message, 5000);
        if (config.devs.includes(message.author.id) || memberRole.find((role) => role.name === 'DJ')) {
            if (serverQueue && serverQueue.playing === true) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                const musicPause = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Pause', 'https://png.icons8.com/stop/dusk/50')
                    .setDescription(`Stream paused by ${message.author.username}`);
                return message.channel.send(musicPause);
            }
        }
    }
};
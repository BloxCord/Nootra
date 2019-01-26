const Discord = require('discord.js');
const global = require('../function/global.js');
const config = require('../storage/globalSettings.js');

module.exports = {
    name: 'stop',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: [],
    type: 'music',
    help: '',
    cooldown: 5,
    execute(client, message, args) {

        var queue = client.queue;
        var serverQueue = queue.get(message.guild.id);
        var memberRoles = message.member.roles;

        global.del(message, 5000);
        if (config.devs.includes(message.author.id) || memberRoles.find((role) => role.name === 'DJ')) {
            if (!message.member.voiceChannel) {
                return message.reply("you're not in a vocal channel.");
            }
            if (!serverQueue) {
                return message.reply("nothing's playing.");
            }
            serverQueue.songs = [];
            const musicStop = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Stop', 'https://png.icons8.com/stop/dusk/50')
                .setDescription(`Stop asked by ${message.author.username} \`🚫\``);
            message.channel.send(musicStop);
            serverQueue.connection.dispatcher.end();
            return undefined;
        } else {
            return message.reply("this command is restricted");
        }
    }
};
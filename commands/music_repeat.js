const Discord = require('discord.js');
const global = require('../function/global.js');

module.exports = {
    name: 'repeat',
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

        var musicRepeat = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Repeat', 'https://png.icons8.com/repeat/dusk/50');
        if (args[0] === 'true') {
            serverQueue.repeat = true;
            const trueEmbed = musicRepeat.setDescription(`**Repeat mode : ${serverQueue.repeat}** \`✅\``);
            return message.channel.send(trueEmbed);
        } else if (args[0] === 'false') {
            serverQueue.repeat = false;
            const falseEmbed = musicRepeat.setDescription(`**Repeat mode : ${serverQueue.repeat}** \`✅\``);
            return message.channel.send(falseEmbed);
        } else if (args[0] === 'toggle') {
            serverQueue.repeat = !serverQueue.repeat;
            const toggleEmbed = musicRepeat.setDescription(`**Repeat mode toggled to : ${serverQueue.repeat}** \`✅\``);
            return message.channel.send(toggleEmbed);
        }
    }
};
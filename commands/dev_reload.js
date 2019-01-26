const Discord = require('discord.js');
const global = require('../function/global.js');

module.exports = {
    name: 'reload',
    description: '',
    guildOnly: true,
    devOnly: true,
    perms: [],
    type: 'dev',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        global.del(message, 5000);
        if (!args) {
            return message.reply("Please specify a command to reload");
        }

        try {
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            return message.channel.send(new Discord.RichEmbed().setDescription(`'${args[0]}' command reloaded \`✅\``).setColor('FF0000'));
        } catch (error) {
            return;
        }
    }
};
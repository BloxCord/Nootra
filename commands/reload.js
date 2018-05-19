const config = require('../config.js');
const discord = require('discord.js');
const fs = require('fs');
exports.timer = '2seconds';
exports.run = (client, message, args) => {
    message ? message.delete(2000) : message;

    if (!args || args.size < 1) {
        return message.reply("Please specify a command to reload");
    }
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.channel.send(`\`\`\`diff\n- Reload :\n${args[0]}.js\n- Status :\n✅\`\`\``);
};
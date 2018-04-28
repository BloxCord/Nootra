const Discord = require("discord.js");
const config = require('../config.js');
const pack = require('../package.json');
exports.timer = '10seconds';
exports.run = (client, message) => {
    // Var
    var msg = message.content;
    var channel = message.channel;
    // Command
    const args = msg.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var content = args.join(' ');

    message.delete(2000);
    const version_embed = new Discord.RichEmbed()
        .addField('Version :', `
<:bot:436602778467696662> ${config.version}
<:node:438739213786152981> ${pack.engines.node}
<:npm:438739213039435776> ${pack.engines.npm}
<:discordjs:438739213350076416> ${pack.dependencies["discord.js"]}
`)
        .setColor('FF0000')
    channel.send(version_embed);
}
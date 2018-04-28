const Discord = require("discord.js");
const config = require('../config.js');
exports.timer = '2seconds';
exports.run = (client, message) => {

    const changelog_embed = new Discord.RichEmbed()
        .setAuthor('Changelog', 'https://png.icons8.com/maintenance/dusk/50')
        .setDescription(`
\`❗❗❗\` **Changelog can be cleared at any time** \`❗❗❗\`
(Actual version : ${config.version}, "${config.prefix}version" for more)
        `)
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
    message.author.send(changelog_embed);

}
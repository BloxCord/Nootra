const Discord = require('discord.js');
const fs = require('fs');

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));

module.exports = {
    name: 'settings',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: ['ADMINISTRATOR'],
    type: 'utility',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        if (args[0] === 'prefix') {
            let oldPrefix = serverSettings[message.guild.id].prefix;
            serverSettings[message.guild.id].prefix = args[1];
            fs.writeFile('./storage/serverSettings.json', JSON.stringify(serverSettings), (err) => {
                if (err) {
                    return console.log(err);
                } else {
                    return message.channel.send(new Discord.RichEmbed()
                        .setColor('FF0000')
                        .setDescription(`
<:no:435603381269037057> *Old prefix :* ${oldPrefix}
<:yes:435603381818490880> *New Prefix :* ${serverSettings[message.guild.id].prefix}
${oldPrefix}  **❯**  ${serverSettings[message.guild.id].prefix}
`));
                }
            });
        } else if (args[0] === 'language') {
            let oldLanguage = serverSettings[message.guild.id].language;
            serverSettings[message.guild.id].language = args[1];
            fs.writeFile('./storage/serverSettings.json', JSON.stringify(serverSettings), (err) => {
                if (err) {
                    return console.log(err);
                } else {
                    return message.channel.send(new Discord.RichEmbed()
                        .setColor('FF0000')
                        .setDescription(`
<:no:435603381269037057> *Old language :* ${oldLanguage}
<:yes:435603381818490880> *New language :* ${serverSettings[message.guild.id].language}
${oldLanguage}  **❯**  ${serverSettings[message.guild.id].language}
`));
                }
            });
        } else if (args[0] === 'level') {
            let oldState = serverSettings[message.guild.id].level;
            serverSettings[message.guild.id].level = !serverSettings[message.guild.id].level;
            fs.writeFile('./storage/serverSettings.json', JSON.stringify(serverSettings), (err) => {
                if (err) {
                    return console.log(err);
                } else {
                    let state = serverSettings[message.guild.id].level === true ? 'on' : 'off';
                    return message.channel.send(new Discord.RichEmbed()
                        .setColor('FF0000')
                        .setDescription(`
<:yes:435603381818490880> Levels are now ${state} !
`));
                }
            });
        }
    }
};
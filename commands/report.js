const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const espion = require('../function/espion.js');
const global = require('../function/global.js');
const fs = require('fs');

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));

exports.timer = '10seconds';
exports.run = (client, message, args) => {
    if (message.channel.id === '444773528479334400') {
        if (args[0] === 'new') {
            var split = '|';
            var split2 = '-';
            args = args.join(' ').split('new').pop().split(split);
            var steps = args[1].split(split2);
            global.trim(args);
            global.trim(steps);
            var crash = args[2] === 'true' ? global.searchEmoji(client, '435603381818490880') : global.searchEmoji(client, '435603381269037057');
            var version = args[3] === '1' ? 'Nøøtra_Release' : args[3] === '2' ? 'Nøøtra_Dev' : 'Other (forked)';
            const report = (`
───────────────────
*${message.author.tag}* reported:
**Description :** ${args[0]}

**Steps to reproduce :**
${steps.map((step) => `- ${step}`).join('\n')}

**Crash ?** ${crash.toString()}
**Version :** ${version}
                `);
            message.channel.send(new Discord.RichEmbed().setColor('FF0000').setDescription('Creating report in <#444781160162394112>.. <a:typing:436602781155983372>')).then((msg) => {
                global.del(msg);
                return espion.bugReport(client, message, report);
            });
        } else if (args[0] === 'aprove') {
            try {
                if (message.member.roles.find((role) => role.id === '444907830768828437')) {
                    const accept = global.searchEmoji(client, '435603381818490880');
                    var content = args.join(' ').split(args[0]).pop().split(args[1]).pop().trim();
                    client.channels.find((channel) => channel.id === '444781160162394112').fetchMessage(args[1]).then((msg) => {
                        content ? msg.edit(msg.content + `\n - ${accept.toString()} (${global.newDate()}) ${message.author.tag} : \`${content}\``) : msg.edit(msg.content + `\n - ${accept.toString()} (${global.newDate()}) ${message.author.tag}`);
                    });
                }
            } catch (error) {
                return;
            }
        } else if (args[0] === 'deny') {
            try {
                if (message.member.roles.find((role) => role.id === '444907830768828437')) {
                    const deny = global.searchEmoji(client, '435603381269037057');
                    var content = args.join(' ').split(args[0]).pop().split(args[1]).pop().trim();
                    client.channels.find((channel) => channel.id === '444781160162394112').fetchMessage(args[1]).then((msg) => {
                        content ? msg.edit(msg.content + `\n - ${deny.toString()} (${global.newDate()}) ${message.author.tag} : \`${content}\``) : msg.edit(msg.content + `\n - ${deny.toString()} (${global.newDate()}) ${message.author.tag}`);
                    });
                }
            } catch (error) {
                return;
            }
        } else {
            const embed = new Discord.RichEmbed()
                .setAuthor('Report command', 'https://png.icons8.com/megaphone/office/100')
                .setColor('FF0000')
                .setTitle('Informations')
                .setDescription(`
**new syntax :** \`${serverSettings[message.guild.id].prefix}report new Short_description_of_the_bug|Step_to_reproduce n°1-Step_to_reproduce n°2 etc..|Crash|Version\`
*Crash = true/false
Version = 1: Nøøtra_Release /2: Nøøtra_Dev /3: Other*

**aprove/deny syntax :** \`${serverSettings[message.guild.id].prefix}report aprove/deny REPORT_ID\`
`);
            return message.channel.send(embed).then((msg) => global.del(msg));
        }
    }
};
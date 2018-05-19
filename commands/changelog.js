const Discord = require("discord.js");
exports.timer = '2seconds';
exports.run = (client, message) => {
    message ? message.delete(2000) : message;
    message.author.send(
        new Discord.RichEmbed()
        .setAuthor('Changelog', 'https://png.icons8.com/maintenance/dusk/50')
        .setColor('FF0000')
        .setDescription(`
\`\`\`diff
0.16.3 : 
+ New command : joke
--- Rework style of eval

0.16.4
--- Rework style of music

0.16.5
--- Rework style of botinfo
--- Changelog text

0.16.6
--- Espion-3.1.0

0.17.0
+ New command : pat
+ New command : translate

0.17.1 && 0.17.2
--- Fixed crash issues 

0.18.0
--- Rewrite code with eslint

0.18.1
+ Make repeat work across servers
--- Fixed crash issues with stop and skip command

0.18.3
+ New command : love
--- Fixed crash issues when you want to clear more than 100 or less than 1 messages

0.18.4
+ New Functions file: global
+ fahrenheit is now a global function

0.19.0
+ New command: faker 
+ New Command: report
- Old Command: bug
--- Change of the bug_report function

0.19.3
+ New command : invite

0.19.4 (16/05/2018)
--- Fixed crash issues with ping command
--- I'll now add the date in the changelog

0.19.5 (16/05/2018)
--- date is now a global function
--- Cleaned version command file
--- Updated multiple packages

0.20.0 (16/05/2018)
+ New command : solve
+ trim is now a global function
--- Corriged syntax errors in espion & global functions
--- Fixed crash issues when deleting messages

0.20.2 (18/05/2018)
--- Replaced "let" by "var" in some (all) files
--- Compacted weather command

0.20.8 (19/05/2018)
+ getDate is now a global function
+ Handling more processus
- Old command : dm
--- Espion-4.0.0
--- Updated contributing.md file
--- Fixed crash issues with the report command
\`\`\``));
};
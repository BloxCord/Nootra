const config = require('../storage/globalSettings.js');
const Discord = require('discord.js');
const global = require('../function/global.js');
const fs = require('fs');

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));

module.exports = {
    name: 'help',
    description: 'Help Command',
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: 'utility',
    help: 'prefix + help \*commandName\*',
    cooldown: 5,
    async execute(client, message, args) {
        let _command = client.commands.find((command) => command.name === args[0]) || '';
        global.del(message, 5000);

        // EMBEDS
        var devNames = '';
        var utilityNames = '';
        var musicNames = '';
        var moderationNames = '';
        var funNames = '';
        client.commands.filter((command) => command.type === 'dev').forEach((command) => devNames += `${command.name}; `);
        client.commands.filter((command) => command.type === 'utility').forEach((command) => utilityNames += `${command.name}; `);
        client.commands.filter((command) => command.type === 'music').forEach((command) => musicNames += `${command.name}; `);
        client.commands.filter((command) => command.type === 'moderation').forEach((command) => moderationNames += `${command.name}; `);
        client.commands.filter((command) => command.type === 'fun').forEach((command) => funNames += `${command.name}; `);
        var description =
            `**__Utility Commands__** :
${utilityNames}
**__Music Commands__** :
${musicNames}
**__Moderation Commands__** :
${moderationNames}
**__Funny Commands__** :    
${funNames}    
`;
        var dev =
            `**__Dev Commands__** : 
${devNames}
`;

        const commandsEmbed = new Discord.RichEmbed()
            .setAuthor("Commands", "https://png.icons8.com/dusk/64/000000/settings.png")
            .setColor('FF0000')
            .setThumbnail("https://png.icons8.com/dusk/64/000000/settings.png");
        if (config.devs.includes(message.author.id)) commandsEmbed.setDescription(description += dev);
        else commandsEmbed.setDescription(description);
        const commandHelp = new Discord.RichEmbed()
            .setAuthor(`Help for ${_command.name}`)
            .setColor('FF0000')
            .setDescription(`
**__Command description__** :
${_command.description === '' ? 'SoonTM' : _command.description}
**__Command usage__** :
${_command.help === '' ? 'SoonTM' : _command.help}
`);

        if (!args[0] && _command === '') return message.author.send(commandsEmbed);
        else if (args[0] && _command === '') return message.reply('command not found');
        else if (args[0] && _command !== '') return message.author.send(commandHelp);
    }
};
const Discord = require('discord.js');
const config = require('../config.js');
const pack = require('../package.json');
const ms = require('ms');
exports.run = (client) => {
    client.user.setUsername(config.name);
    client.user.setActivity(config.version);
    client.user.setStatus('online');

    console.log("Connexion...");
    console.log(`
En ligne sous le nom de: ${config.name}
Statistiques : ${client.users.size} Utilisateurs, ${client.guilds.size} Serveurs

-----Versions-----
Bot_version : ${config.version}
Espion_version : ${config.espion_version}
Node_version : ${pack.engines.node}
NPM_version : ${pack.engines.npm}
discord.js_version: ${pack.dependencies['discord.js']}
------------------
`);

    // Status : Dev
    if (client.users.get('416534697703636993').presence.status === 'online') {
        console.log('DEV : EN LIGNE');
    } else if (client.users.get('416534697703636993').presence.status === 'dnd') {
        console.log('DEV : DEBUG MODE');
    } else {
        console.log('DEV : HORS LIGNE');
    }
    // Status : Release
    if (client.users.get('416275248153886720').presence.status === 'online') {
        console.log('RELEASE : EN LIGNE');
    } else if (client.users.get('416275248153886720').presence.status === 'dnd') {
        console.log('RELEASE : DEBUG MODE');
    } else {
        console.log('RELEASE : HORS LIGNE');
    }
}
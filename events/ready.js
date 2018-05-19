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
Online as : ${config.name}
Stats : ${client.users.size} Users, ${client.guilds.size} Servers

-----Versions-----
Bot_version : ${config.version}
Espion_version : ${config.espion_version}
Node_version : ${pack.engines.node}
NPM_version : ${pack.engines.npm}
discord.js_version: ${pack.dependencies['discord.js']}
------------------
`);

    var devStatus = client.users.get('416534697703636993').presence.status;
    var releaseStatus = client.users.get('416275248153886720').presence.status;

    devStatus = devStatus === 'online' ? "Dev : Online" : devStatus === 'dnd' ? "Dev : Debug" : "Dev : Offline";
    releaseStatus = releaseStatus === 'online' ?  "Release : Online" : releaseStatus === 'dnd' ? "Release : Debug" : "Release : Offline";

    console.log(devStatus);
    console.log(releaseStatus);
};
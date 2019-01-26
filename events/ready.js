const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const pack = require('../package.json');
const ms = require('ms');
const global = require('../function/global.js');

exports.run = (client) => {
    client.user.setUsername(config.name);
    client.user.setActivity(config.version);
    client.user.setStatus('online');
    var devStatus = client.users.get('416534697703636993').presence.status;
    var releaseStatus = client.users.get('416275248153886720').presence.status;

    devStatus = devStatus === 'online' ? "Dev : Online" : devStatus === 'dnd' ? "Dev : Debug" : "Dev : Offline";
    releaseStatus = releaseStatus === 'online' ? "Release : Online" : releaseStatus === 'dnd' ? "Release : Debug" : "Release : Offline";

    console.log(`
Connection...
Online as : ${config.name}
-------Stat-------
Users : ${client.users.size}
Guilds : ${client.guilds.size}
-----Versions-----
Bot Version : ${config.version}
Logger Version : ${config.loggerVersion}
NodeJS Version : ${pack.engines.node}
NPM Version : ${pack.engines.npm}
discord.js Version : ${pack.dependencies['discord.js']}
------Status------
${devStatus}
${releaseStatus}
------------------
 _   _                _                
| \\ | |              | |
|  \\| |  ___    ___  | |_  _ __   __ _ 
| . \` | / _ \\  / _ \\ | __|| '__| / _\` |
| |\\  || (_) || (_) || |_ | |   | (_| |
\\_| \\_/ \\___/  \\___/  \\__||_|    \\__,_|
`);

};
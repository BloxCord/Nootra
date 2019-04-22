const pack = require("../package.json");
const global = require("../function/global.js");

exports.run = (client) => {
    client.user.setUsername(client.config.name);
    client.user.setActivity(client.config.version);
    client.user.setStatus("online");

    client.guilds.forEach((guild) => {
        global.setConfig(client, guild);
    });

    var devStatus = client.users.get(require("../storage/globalSettings.js").devConfig.id).presence.status;
    var releaseStatus = client.users.get(require("../storage/globalSettings.js").releaseConfig.id).presence.status;

    devStatus = devStatus === "online" ? "Dev : Online" : devStatus === "dnd" ? "Dev : Debug" : "Dev : Offline";
    releaseStatus = releaseStatus === "online" ? "Release : Online" : releaseStatus === "dnd" ? "Release : Debug" : "Release : Offline";

    console.log(`
Connection...
Online as : ${client.config.name}
-------Stat-------
Users : ${client.users.size}
Guilds : ${client.guilds.size}
-----Versions-----
Bot Version : ${client.config.version}
Logger Version : ${client.config.loggerVersion}
NodeJS Version : ${pack.engines.node}
NPM Version : ${pack.engines.npm}
discord.js Version : ${pack.dependencies["discord.js"]}
------Status------
${devStatus}
${releaseStatus}
------------------
 _   _                _                
| \\ | |              | |
|  \\| |  ___    ___  | |_  _ __   __ _ 
| . \` | / _ \\  / _ \\ | __|| "__| / _\` |
| |\\  || (_) || (_) || |_ | |   | (_| |
\\_| \\_/ \\___/  \\___/  \\__||_|    \\__,_|
`);

};
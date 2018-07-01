// Require
const config = require('./config.js');
const Discord = require('discord.js');
const fs = require('fs');
const espion = require('./function/espion.js');
const ms = require('ms');
////////////////////////////

const client = new Discord.Client();

// Process Handler
fs.readdir("./process/", (error, files) => {
    if (error) {
        espion.new_error(client, error);
        return console.error(error);
    }
    files.forEach((file) => {
        var processFunction = require(`./process/${file}`);
        var processName = file.split(".")[0];
        process.on(processName, (...args) => processFunction.run(client, ...args));
    });
});

// Event Handler
fs.readdir("./events/", (error, files) => {
    if (error) {
        espion.new_error(client, error);
        return console.error(error);
    }
    files.forEach((file) => {
        var eventFunction = require(`./events/${file}`);
        var eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
var i = 0;
setInterval(() => {
    console.log(`Heartbeat n°${i++}
Client ping : ${ms(Math.round(client.ping))}`);

    client.channels.find('id', '453971307982225429').edit({
        name: `Total Users : ${client.users.size}`
    }, 'Auto Update');

    client.channels.find('id', '453971363997155359').edit({
        name: `Member Count : ${client.guilds.find('id', '416532107939151872').members.size}`,
    }, 'Auto Update');
}, ms('2 minutes'));

client.login(config.token);
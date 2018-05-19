// Require
const config = require('./config.js');
const Discord = require('discord.js');
const fs = require('fs');
const espion = require('./function/espion.js');
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

client.login(config.token);
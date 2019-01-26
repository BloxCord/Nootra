// Require
const global = require('./function/global.js');
const config = require('./storage/globalSettings.js');
const Discord = require('discord.js');
const fs = require('fs');
const logger = require('./function/logger.js');
const ms = require('ms');
////////////////////////////

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.queue = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith(".js"));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Process Handler
fs.readdir("./process/", (error, files) => {
    if (error) {
        logger.newError(client, error, __filename);
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
        logger.newError(client, error, __filename);
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

    client.channels.find((channel) => channel.id === '453971307982225429').edit({
        name: `👥 Total Users : ${client.users.size - 1}`
    }, 'Auto Update');

    client.channels.find((channel) => channel.id === '453971363997155359').edit({
        name: `🎎 Member Count : ${client.guilds.find((guild) => guild.id === '416532107939151872').members.size}`,
    }, 'Auto Update');

    client.channels.find((channel) => channel.id === '483624060300034048').edit({
        name: `📡 Last Ping : ${ms(Math.round(client.ping))}`,
    }, 'Auto Update');

    client.channels.find((channel) => channel.id === '483624077139902466').edit({
        name: `💓 Heartbeat : ${i - 1}`,
    }, 'Auto Update');
}, ms('2 minutes'));

client.login(config.token);
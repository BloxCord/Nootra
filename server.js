// Require
const config = require('./config.js');
const Discord = require('discord.js');
const fs = require('fs');
const espion = require('./function/espion.js');
////////////////////////////

const client = new Discord.Client();
client.login(config.token);

// Process Handler
fs.readdir("./process/", (error, files) => {
    if (error) {
        return console.error(error)
        espion.new_error(client, error)
    }
    files.forEach(file => {
        let processFunction = require(`./process/${file}`);
        let processName = file.split(".")[0];
        process.on(processName, (...args) => processFunction.run(client, ...args));
    })
})

// Event Handler
fs.readdir("./events/", (error, files) => {
    if (error) {
        return console.error(error)
        espion.new_error(client, error)
    }
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

// Date de connection
let fixheure = ''
if (config.id !== 416534697703636993) fixheure = config.fixheure
else fixheure = 0
let dateco = new Date();
let ddco = dateco.getDate();
let mmco = dateco.getMonth() + 1;
let yyyyco = dateco.getFullYear();
let secondco = dateco.getSeconds();
let minuteco = dateco.getMinutes();
let heureco = dateco.getHours() + fixheure;
if (ddco < 10) ddco = '0' + ddco
if (mmco < 10) mmco = '0' + mmco
if (secondco < 10) secondco = '0' + secondco
if (minuteco < 10) minuteco = '0' + minuteco
if (heureco < 10) heureco = '0' + heureco

exports.date = {
    ddco: ddco,
    mmco: mmco,
    yyyyco: yyyyco,
    secondco: secondco,
    minuteco: minuteco,
    heureco: heureco
}

/* 
© 2018 LÉO HUGONNOT ALL RIGHTS RESERVED
*/
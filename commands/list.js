const config = require('../config.js');
const Discord = require('discord.js');
const sql = require('sqlite');
sql.open('./db/levels.sqlite');
exports.timer = '2seconds';
exports.run = (client, message) => {
message ? message.delete(2000) : message;
    if (!message.author.id === config.admin) {
        return message.channel.send("Vous n'avez pas accès à cette commande.");
    } else {
        message.channel.send({
            file: './db/levels.sqlite'
        });
    };
};
const config = require('../config.js');
const Discord = require('discord.js');
const sql = require('sqlite');
sql.open('./db/levels.sqlite');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    
    if (!message.author.id === config.admin) {
        return message.channel.send("Vous n'avez pas accès à cette commande.");
    } else {
        message.channel.send({
            file: './db/levels.sqlite'
        });
    };
};
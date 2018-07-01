const Discord = require("discord.js");
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '1seconds';
exports.run = (client, message, args) => {
    
    global.del(message);
    
    if (message.author.id === config.admin) {
        console.log('Déconnexion...');
        process.exit(1000);
    };
};
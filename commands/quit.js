const Discord = require("discord.js");
config = require('../config.js');
exports.timer = '1seconds';
exports.run = (client, message) => {

    if (message.author.id === config.admin) {
        console.log('Déconnexion...');
        process.exit(1000);
    };
}
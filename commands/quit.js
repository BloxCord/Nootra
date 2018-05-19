const Discord = require("discord.js");
const config = require('../config.js');

exports.timer = '1seconds';
exports.run = (client, message) => {
message ? message.delete(2000) : message;
    if (message.author.id === config.admin) {
        console.log('Déconnexion...');
        process.exit(1000);
    };
};
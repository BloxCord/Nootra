const Discord = require('discord.js');
const espion = require('../function/espion.js');

exports.run = (client, error) => {
    console.log(error);
    return espion.newError(client, error, __filename);
};
const Discord = require('discord.js');
const espion = require('../function/espion.js');
/* eslint-disable arrow-body-style */

exports.run = (client, error) => {
    espion.newError(client, error, __filename);
};
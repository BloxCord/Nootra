const discord = require('discord.js');
const espion = require('../function/espion.js');
exports.run = (client, error) => {
    espion.new_error(client, error);
    console.log(error);
    return;
}
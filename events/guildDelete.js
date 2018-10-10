const discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const espion = require('../function/espion.js');

exports.run = (client, guild) => {

    espion.guildDelete(client, guild);

};
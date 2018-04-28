const discord = require('discord.js');
const config = require('../config.js');
const espion = require('../function/espion.js')
exports.run = (client, guild) => {

    espion.guild_delete(client, guild)

};
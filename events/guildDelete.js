const discord = require("discord.js");
const config = require("../storage/globalSettings.js");
const logger = require("../function/logger.js");

exports.run = (client, guild) => {

    logger.guildDelete(client, guild);

};
const logger = require("../function/logger.js");

exports.run = (client, guild) => {

    logger.guildDelete(client, guild);

};
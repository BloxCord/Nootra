const logger = require("../function/logger.js");
const global = require("../function/global.js");

exports.run = (client, guild) => {

    logger.guildCreate(client, guild);
    global.setConfig(client, guild);

};
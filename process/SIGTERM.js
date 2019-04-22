const Discord = require("discord.js");
const logger = require("../function/logger.js");
/* eslint-disable arrow-body-style */

exports.run = (client, error) => {
    return logger.newError(client, error, __filename);
};
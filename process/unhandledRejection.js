const Discord = require("discord.js");
const logger = require("../function/logger.js");

exports.run = (client, error) => {
    console.log(error);
    return logger.newError(client, error, __filename);
};
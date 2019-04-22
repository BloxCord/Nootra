const Discord = require("discord.js");
const config = require("../storage/globalSettings.js");
const logger = require("../function/logger.js");

exports.run = async (client, member) => {

	logger.memberRemove(client, member);
	
};
const logger = require("../function/logger.js");

exports.run = async (client, member, guild) => {

	logger.memberAdd(client, member, guild);

};
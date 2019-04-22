const logger = require("../function/logger.js");

exports.run = async (client, member) => {

	logger.memberRemove(client, member);
	
};
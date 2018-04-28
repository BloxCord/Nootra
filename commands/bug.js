const Discord = require("discord.js");
config = require('../config.js');
const espion = require('../function/espion.js');
exports.timer = '20seconds';
exports.run = (client, message, args) => {

    espion.bug_report(client, message, args)
    message.reply(`Thank you for your help ! [\`✅\`]`)
    message.delete()

}
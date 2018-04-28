const Discord = require("discord.js");
const config = require('../config.js');
const espion = require('../function/espion.js');
exports.timer = '10seconds';
exports.run = (client, message, args) => {

    espion.new_todo(client, message, args)
    message.reply(`Thank you for your help. [\`✅\`]`)
    message.delete()

}
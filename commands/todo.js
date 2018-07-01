const Discord = require("discord.js");
const config = require('../config.js');
const espion = require('../function/espion.js');
const global = require('../function/global.js');

exports.timer = '10seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    
    espion.new_todo(client, message, args);
    message.reply(`Thank you for your help. [\`✅\`]`);

};
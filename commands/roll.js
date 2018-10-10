const Discord = require("discord.js");
const config = require('../storage/globalSettings.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {
    
    if (args[0]) {
        var result = Math.floor((Math.random() * args[0]) + 1);
    } else {
        var result = Math.floor((Math.random() * 100) + 1);
    }
    message.reply(`you've made a ${result}`);
};
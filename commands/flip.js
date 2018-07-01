const Discord = require("discord.js");
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    var channel = message.channel;
    var result = Math.floor((Math.random() * 2) + 1);

    if (result === 1) {
        channel.send("HEAD !");
    } else {
        channel.send("TAIL !");
    }
};
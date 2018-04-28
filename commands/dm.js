const Discord = require("discord.js");
const config = require('../config.js');
const espion = require('../function/espion.js');
exports.timer = (client) => '15seconds';
exports.run = (client, message, args) => {

        let usermention = message.mentions.members.first()
        let contentwtm = args.join(' ').split(usermention + ' ').pop();
        usermention.send(contentwtm)

        espion.new_mp(client, message, contentwtm, usermention)
        message.reply(`message sent to ${usermention.user.tag}`)
        message.delete(2000)
}
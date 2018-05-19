const config = require('../config.js');
const Discord = require('discord.js');

exports.run = (client, message, args) => {

    message.channel.createInvite()
        .then((invite) => message.channel.send(`Invitation link ${invite.url}`));

};
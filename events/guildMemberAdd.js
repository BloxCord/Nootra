const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const espion = require('../function/espion.js');

exports.run = (client, member, guild) => {

    if (member.guild.id === '110373943822540800') {
        return;
    } else {
        espion.memberAdd(client, member, guild);
    }

};
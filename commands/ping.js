const Discord = require("discord.js");
const config = require('../config.js');
const global = require('../function/global.js');
const ms = require('ms');

exports.timer = '2seconds';
exports.run = (client, message) => {
message ? message.delete(2000) : message;
    var quality = Math.round(client.ping) >= 150 ? 'bad \`😑\`' : Math.round(client.ping) >= 100 ? 'average \`😬\`' : 'good \`😀\`';

    const PingEmbed = new Discord.RichEmbed()
        .addField('API Response time `🕑` : ', `${Math.round(client.ping)}ms, ${quality}`, false)
        .addField('Uptime `⌛` : ', `${ms(client.uptime, {long : true})}`, false)
        .addField('Connected on `📆` : ', `${global.connexionDate()}`, false)
        .setAuthor(`Ping`, "https://png.icons8.com/dusk/50/000000/speed.png")
        .setColor('FF0000')
        .setFooter(config.name, config.avatar);
    message.channel.send(PingEmbed);

};
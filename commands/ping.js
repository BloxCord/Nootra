const Discord = require("discord.js");
const config = require('../config.js');
const date = require('../server.js');
const ms = require('ms');
exports.timer = '2seconds';
exports.run = (client, message) => {

    let quality = '';
    if (`${Math.round(client.ping)}` >= 150) {
        quality = 'bad \`😑\`';
    } else if (`${Math.round(client.ping)}` >= 100) {
        quality = 'average \`😬\`';
    } else {
        quality = 'good \`😀\`';
    };

    let moment = ''
    if(date.date.heureco >= 12&& date.date.minuteco >= 0) moment = 'pm'
    else moment = 'am'

    const ping_embed = new Discord.RichEmbed()
        .addField('API Response time `🕑` : ', `${Math.round(client.ping)}ms, ${quality}`, false)
        .addField('Uptime `⌛` : ', `${ms(client.uptime, {long : true})}`, false)
        .addField('Connected on `📆` : ', `${date.date.mmco}/${date.date.ddco}/${date.date.yyyyco} at ${date.date.heureco}:${date.date.minuteco}${moment}`, false)
        .setAuthor(`Ping`, "https://png.icons8.com/dusk/50/000000/speed.png")
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
    message.channel.send(ping_embed);
    message.delete(2000);

}
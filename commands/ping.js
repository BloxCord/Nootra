const Discord = require("discord.js");
const config = require('../storage/globalSettings.js');
const ms = require('ms');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    
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
const Discord = require('discord.js');
const config = require('../config.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {
message ? message.delete(2000) : message;
    var user = message.member;
    var usermention = message.mentions.members.first();
    var usermention2 = message.mentions.members.last();
    var size = message.mentions.members.size;

    if (size > 2) {
        return message.reply('you mentionned more than 2 people!');
    }
    var percent = size > 1 ? (usermention.id && usermention2.id) === user.id ? "101" : (usermention.id + usermention2.id) % 101 : usermention.id === user.id ? "101" : (user.id + usermention.id) % 101;
    if (size > 1) {
        var result = percent <= 30 ? `${usermention.user.username}, you should'nt mess with ${usermention2.user.username}..` : percent <= 50 ? `You could at least try to be friends ?` : percent <= 70 ? 'Close friends' : percent <= 80 ? "Best friends" : percent <= 90 ? 'Inseparable' : percent <= 100 ? 'Perfect Match!' : "You're made for yourself!";
    } else {
        var result = percent <= 30 ? `${user.user.username}, you should'nt mess with ${usermention.user.username}..` : percent <= 50 ? `You could at least try to be friends ?` : percent <= 70 ? 'Close friends' : percent <= 80 ? "Best friends" : percent <= 90 ? 'Inseparable' : percent <= 100 ? 'Perfect Match!' : "You're made for yourself!";
    }
    var barre = percent <= 10 ? '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬' : percent <= 20 ? '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬' : percent <= 30 ? '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬' : percent <= 40 ? '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬' : percent <= 50 ? '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬' : percent <= 60 ? '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬' : percent <= 70 ? '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬' : percent <= 80 ? '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬' : percent <= 90 ? '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬' : '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)';

    const embed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setDescription(`
\`💝\` ${size > 1 ? usermention.user.username : user.user.username}
\`💝\` ${size > 1 ? usermention2.user.username : usermention.user.username}
        `)
        .addField("Lov'O'Meter", `
${result}
${barre} \`[${percent}%]\`
        `);

    message.channel.send(embed);
};
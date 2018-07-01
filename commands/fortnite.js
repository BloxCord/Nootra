const config = require('../config.js');
const global = require('../function/global.js');
const espion = require('../function/espion.js');
const Discord = require('discord.js');
const clientFortnite = require('fortnite');
const fortnite = new clientFortnite('b53ba0ca-f2ae-4adc-a26e-7c23e0d41a34');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    args[1] ? args = global.trim(args.join(' ')) : args = args.toString();

    function profile(data) {
        const percent = data.stats.lifetime[9]['Win%'].split('%')[0];
        var displayPercent = percent <= 1 ? '▬▬▬▬▬▬▬▬▬▬' : percent <= 10 ? '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬' : percent <= 20 ? '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬' : percent <= 30 ? '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬' : percent <= 40 ? '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬' : percent <= 50 ? '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬' : percent <= 60 ? '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬' : percent <= 70 ? '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬' : percent <= 80 ? '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬' : percent <= 90 ? '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬' : '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)';
        const ratio = data.stats.lifetime[11]['K/d'] < 1 ? '👎' : data.stats.lifetime[11]['K/d'] === 1 ? '👌' : '👍';
        const embed = new Discord.RichEmbed()
            .setAuthor(`Fortnite Tracker for ${data.username} on ${data.platform}`)
            .setColor('FF0000')
            .setThumbnail('https://png.icons8.com/dusk/64/000000/fortnite.png')
            .setDescription(`
**\`🎮\` Matches Played :** ${data.stats.lifetime[7]['Matches Played']}
**\`🏆\` Wins :** ${data.stats.lifetime[8]['Wins']}
**\`💎\` Top 3 :** ${data.stats.lifetime[0]['Top 3']}
**\`💀\` Kills :** ${data.stats.lifetime[10]['Kills']}
**\`${ratio}\` Kill/Death ratio :** ${data.stats.lifetime[11]['K/d']}
**\`💠\` Win percentage :** (${data.stats.lifetime[9]['Win%']})
\`[0%]\` ${displayPercent} \`[100%]\`
`);
        return message.channel.send(embed);
    }

    try {
        fortnite.user(args, 'pc').then((data) => {
            profile(data);
        }, () => fortnite.user(args, 'xbl').then((data) => {
            profile(data);
        }, () => fortnite.user(args, 'psn').then((data) => {
            profile(data);
        }, (reason) => {
            message.reply(global.lowerSentence(reason.message));
        })));
    } catch (error) {
        return espion.new_error(client, error);
    }

};
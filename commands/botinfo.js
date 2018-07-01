const config = require('../config.js');
const Discord = require('discord.js');
const os = require('os');
const osutils = require('os-utils');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    var status = client.users.get(config.id).presence.status;
    var StatusEmoji = status === 'online' ? 'https://cdn.discordapp.com/emojis/435603484616818708.png' : status === 'dnd' ? 'https://cdn.discordapp.com/emojis/435603483140292609.png' : status === 'idle' ? 'https://cdn.discordapp.com/emojis/435603483173978123.png' : 'https://cdn.discordapp.com/emojis/435603483627094026.png';
    var tag = client.users.find('id', config.admin).tag;

    var memusage = Math.round((os.freemem() * 100) / os.totalmem());

    var usage = memusage <= 10 ? '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬' : memusage <= 20 ? '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬' : memusage <= 30 ? '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬' : memusage <= 40 ? '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬' : memusage <= 50 ? '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬' : memusage <= 60 ? '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬' : memusage <= 70 ? '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬' : memusage <= 80 ? '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬' : memusage <= 90 ? '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬' : '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)';

    const embed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setFooter(`Status : ${global.capitalizeArg(status)}`, StatusEmoji)
        .addField(`${client.user.username}`, (`
<:servers:440466171452719104> ${client.guilds.size}
<:users:440466171712765970> ${client.users.size}
<:dev:440466171029094400> ${tag}
<:bot:436602778467696662> ${config.version}
<:language:440466170852802568> Javascript
<:library:440466171284815872> [discord.js](http://discord.js.org/)
<:ram:440466171221770251> \`[0%]\` ${usage} \`[100%]\`
`), false);
    return message.channel.send(embed);
};
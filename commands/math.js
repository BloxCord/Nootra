const math = require('mathjs');
const Discord = require('discord.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    if (!args[0]) {
        return message.reply('please input some math stuff');
    } else {
        try {
            var output = math.eval(args.join(' '));
            const embed = new Discord.RichEmbed()
                .addField("\`📥\` **Input**", `\`\`\`js\n${args.join(' ')}\`\`\``, false)
                .addField("\`📤\` **Output**", `\`\`\`js\n${output}\`\`\``)
                .setColor('FF0000');
            return message.channel.send(embed);
        } catch (error) {
            return message.reply('error while processing..');
        }
    }
};
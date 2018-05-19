const al = require('algebra.js');
const global = require('../function/global.js');
const Discord = require('discord.js');

exports.timer = '10seconds';
exports.run = (client, message, args) => {
message ? message.delete(2000) : message;

    args = args.join(' ').split('=');
    global.trim(args);
    try {
        var exp1 = al.parse(args[0]);
        var exp2 = al.parse(args[1]);
        var eq = new al.Equation(exp1, exp2);
        var x = eq.solveFor('x');

        const embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .addField("\`📥\` **Input**", `\`\`\`${eq.toString()}\`\`\``, false)
            .addField("\`📤\` **Output**", `\`\`\`x = ${x.toString()}\`\`\``, false);
        return message.channel.send(embed);
    } catch (error) {
        const embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .addField("\`❌\` Error", 'Error while processing your equation');
        return message.channel.send(embed);
    }
};
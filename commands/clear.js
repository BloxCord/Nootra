const Discord = require("discord.js");
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '5seconds';
exports.run = (client, message, args) => {


    if (message.author.id === config.admin || message.member.hasPermission('MANAGE_MESSAGES')) {
        try {
            clear(client, message, args);
        } catch (error) {
            return console.log(error);
        }
    } else {
        return message.reply("you don't have access to this command.");
    }
};

async function clear(client, message, args) {
    try {
        if (isNaN(args[0])) {
            return message.reply("please use a valid number *between* 1 and 100");
        }
        if (Number(args[0]) < 1 || Number(args[0]) > 100) {
            return message.channel.send(`"**${args[0]}**" isn't a valid number, please use a number *between* 1 and 100`);
        }
        const fetched = await message.channel.fetchMessages({
            limit: args[0]
        });
        message.channel.bulkDelete(fetched);
        const embed = new Discord.RichEmbed()
            .setAuthor(`${fetched.size} message cleared !`)
            .setColor('FF0000')
            .setFooter(config.name, config.avatar)
            .setImage("https://png.icons8.com/trash_can/office/100")
            .setTimestamp();
        return message.channel.send(embed).then((msg) => {
            global.del(msg, 5000);
        });
    } catch (error) {
        return message.channel.send('error while deleting messages');
    }
}
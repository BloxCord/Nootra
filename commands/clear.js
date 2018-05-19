const Discord = require("discord.js");
const config = require('../config.js');

exports.timer = '1seconds';
exports.run = (client, message, args) => {

    var msg = message.content;
    var author = message.author;
    var channel = message.channel;
    var user = message.member;

    if (author.id === config.admin || user.hasPermission('MANAGE_MESSAGES')) {

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
    const ClearEmbed = new Discord.RichEmbed()
        .setAuthor(`${fetched.size} message cleared !`)
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setImage("https://png.icons8.com/trash_can/office/100")
        .setTimestamp();
    message.channel.send(ClearEmbed).then((msg) => {
    msg ? msg.delete(2000) : message;
    });
}
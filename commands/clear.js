const Discord = require("discord.js");
config = require('../config.js');
exports.timer = '1seconds';
exports.run = (client, message, args) => {
     
    let msg = message.content;
    let author = message.author;
    let channel = message.channel;
    let user = message.member

    if (author.id === config.admin || user.hasPermission('MANAGE_MESSAGES')) {

        clear(client, message, args);

    } else return message.reply("you don't have access to this command.")
}

async function clear(client, message, args) {
    if (isNaN(args[0]))  return message.reply("utilisez un chiffre !")
    const fetched = await message.channel.fetchMessages({
        limit: args[0]
    });
    message.channel.bulkDelete(fetched)
    const clear_embed = new Discord.RichEmbed()
        .setAuthor(`${fetched.size} message cleared !`, "https://png.icons8.com/trash_can/office/100")
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setThumbnail("https://png.icons8.com/trash_can/office/100")
        .setTimestamp()
    message.channel.send(clear_embed).then((message) => { setTimeout(() => { message.delete() }, 3000)
    })
}
const Discord = require("discord.js");
const config = require('../storage/globalSettings.js');
const global = require('../function/global.js');

exports.timer = '5seconds';
exports.run = async (client, message, args) => {
    if (message.author.id === config.admin || message.member.hasPermission('MANAGE_MESSAGES')) {
        
            if (isNaN(args[0])) {
                return message.reply("please use a valid number *between* 1 and 100");
            }
            if (Number(args[0]) < 1 || Number(args[0]) > 100) {
                return message.channel.send(`"**${args[0]}**" is not a valid number, please use a number *between* 1 and 100`);
            }
            const fetched = await message.channel.fetchMessages({
                limit: args[0]
            });

            try {
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

            }
    } else {
        return message.reply("you don't have access to this command.");
    }
};
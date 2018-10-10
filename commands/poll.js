const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    var split = '|';
    var user = message.member;
    if (message.author.id === config.admin || user.hasPermission('MENTION_EVERYONE')) {
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setAuthor('Poll command')
                .setColor('FF0000')
                .setTitle('Informations')
                .setDescription(`**Syntax** : Question ${split} Proposition 1 ${split} Proposition 2 ${split} Proposition 3 ${split} Proposition 4 ${split} Proposition 5 ${split} Proposition 6`);
            return message.channel.send(embed);
        }

        args = args.join(' ').split(split);
        global.trim(args);

        const embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setAuthor(args[0])
            .setFooter(config.name, config.avatar)
            .setThumbnail('http://survation.com/wp-content/uploads/2016/09/polleverywherelogo.png')
            .setTimestamp();
        if (args[1]) {
            embed.addField('Proposition n°1 :', args[1], false);
        }
        if (args[2]) {
            embed.addField('Proposition n°2 :', args[2], false);
        }
        if (args[3]) {
            embed.addField('Proposition n°3', args[3], false);
        }
        if (args[4]) {
            embed.addField('Proposition n°4', args[4], false);
        }
        if (args[5]) {
            embed.addField('Proposition n°5', args[5], false);
        }
        if (args[6]) {
            embed.addField('Proposition n°6', args[6], false);
        }
        return message.channel.send(embed).then((message) => {
            if (args[1]) {
                message.react('1⃣').then(() => {
                    if (args[2]) {
                        message.react('2⃣').then(() => {
                            if (args[2]) {
                                message.react('2⃣').then(() => {
                                    if (args[3]) {
                                        message.react('3⃣').then(() => {
                                            if (args[4]) {
                                                message.react('4⃣').then(() => {
                                                    if (args[5]) {
                                                        message.react('5⃣').then(() => {
                                                            if (args[6]) {
                                                                message.react('6⃣');
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        return message.reply("you don't have access to this command.");
    }
};
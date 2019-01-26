const Discord = require('discord.js');
const global = require('../function/global.js');
const fs = require('fs');

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));
module.exports = {
    name: 'emoji',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: ['MANAGE_EMOJIS'],
    type: 'utility',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        global.del(message, 5000);
        var emojiId = args[1].split(':').pop().split('>')[0];
        switch (args[0]) {
            case 'new':
                try {
                    message.guild.createEmoji(args[1].trim(), args[2].trim()).then((newemoji) => {
                        const embed = new Discord.RichEmbed()
                            .setColor("FF0000")
                            .addField(`New emoji added by ${message.author.username}`, `"${newemoji.name}" ${newemoji.toString()}`);
                        message.channel.send(embed);
                    });
                } catch (error) {
                    return message.reply(`couldn't create this emoji, please retry with proper arguments (syntax: ${serverSettings[message.guild.id].prefix}emoji new "img_link" "emoji_name")`);
                }
                break;
            case 'del':
                var emoji = message.guild.emojis.find((emoji) => emoji.id === emojiId);
                try {
                    const embed = new Discord.RichEmbed()
                        .setColor("FF0000")
                        .addField(`Emoji deleted by ${message.author.username}`, `"${emoji.name}" ${emoji.toString()}`);
                    message.channel.send(embed).then(() => message.guild.deleteEmoji(emoji.id));
                } catch (error) {
                    return message.reply(`couldn't delete this emoji, please retry with proper arguments (syntax: ${serverSettings[message.guild.id].prefix}emoji del "emoji")`);
                }
                break;
            case 'code':
                var emoji = message.guild.emojis.find((emoji) => emoji.id === emojiId);
                try {
                    const embed = new Discord.RichEmbed()
                        .setColor("FF0000")
                        .setDescription(`Emoji code for ${emoji.toString()} is **\\${emoji.toString()}**`);
                    message.channel.send(embed);
                } catch (error) {
                    return message.reply(`couldn't get this emoji, please retry with proper arguments (syntax: ${serverSettings[message.guild.id].prefix}emoji code "emoji")`);
                }
                break;
            case 'url':
                var emoji = message.guild.emojis.find((emoji) => emoji.id === emojiId);
                try {
                    const embed = new Discord.RichEmbed()
                        .setColor("FF0000")
                        .setDescription(`Emoji url for ${emoji.toString()} is **[here](${emoji.url})**`);
                    message.channel.send(embed);
                } catch (error) {
                    return message.reply(`couldn't get this emoji, please retry with proper arguments (syntax: ${serverSettings[message.guild.id].prefix}emoji url "emoji")`);
                }
                break;
            default:
                return message.reply(`Available commands : ${serverSettings[message.guild.id].prefix}emoji new/del/code/url`);
        }
    }
};
const Discord = require('discord.js');
const config = require('../config.js');

exports.timer = '10seconds'
exports.run = (client, message, args) => {

    let user = message.member
    var emoji = message.guild.emojis.find('id', args[1].split(':').pop().split('>')[0])

    if (message.author.id === config.amdin || user.hasPermission("MANAGE_EMOJIS")) {
        if (args[0] === 'new') {
            try {
                message.guild.createEmoji(args[1], args[2]).then((newemoji) => {
                    const embed = new Discord.RichEmbed()
                        .setColor("FF0000")
                        .addField(`New emoji added by ${message.author.username}`, `"${newemoji.name}" ${newemoji.toString()}`)
                    message.channel.send(embed)
                })
            } catch (error) {
                return message.reply(`couldn't create this emoji, please retry with proper arguments (syntax: ${config.prefix}emoji new "img_link" "emoji_name")`)
            }
        } else if (args[0] === 'del') {
            try {
                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .addField(`Emoji deleted by ${message.author.username}`, `"${emoji.name}" ${emoji.toString()}`)
                message.channel.send(embed).then(() => message.guild.deleteEmoji(emoji.id))
            } catch (error) {
                return message.reply(`couldn't delete this emoji, please retry with proper arguments (syntax: ${config.prefix}emoji del "emoji")`)
            }
        } else if (args[0] === 'code') {
            try {
                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setDescription(`Emoji code for ${emoji.toString()} is **\\${emoji.toString()}**`)
                message.channel.send(embed)
            } catch (error) {
                return message.reply(`couldn't get this emoji, please retry with proper arguments (syntax: ${config.prefix}emoji code "emoji")`)
            }
        } else if (args[0] === 'url') {
            try {
                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setDescription(`Emoji url for ${emoji.toString()} is **[here](${emoji.url})**`)
                message.channel.send(embed)
            } catch (error) {
                return message.reply(`couldn't get this emoji, please retry with proper arguments (syntax: ${config.prefix}emoji url "emoji")`)
            }
        } else return message.reply(`Available commands : ${config.prefix}emoji new/del/code/url`)
    }



}
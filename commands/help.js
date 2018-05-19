const config = require('../config.js');
const Discord = require('discord.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    // EMBEDS

    //Utility
    const UtilityEmbed1 = new Discord.RichEmbed()
        .setAuthor("Utility Commands", "https://i.imgur.com/UrMJXCI.png")
        .setColor('FF0000')
        .setThumbnail("https://i.imgur.com/UrMJXCI.png")
        .setDescription(`
**${config.prefix}announce :** Do this command to have the syntax [You need : Mention Everyone]

**${config.prefix}ask "question" :** Respond to question (e.g. ${config.prefix}ask Am I the best bot in here ? (obvious answer <:kappa:436421096841936896>))

**${config.prefix}avatar @mention :** Respond with avatar (e.g. ${config.prefix}avatar @RanDoMGUy#1210)

**${config.prefix}report :** Do this command to have the syntax

**${config.prefix}changelog :** Send the changelog

**${config.prefix}color @role "color" :** Change the color of the mentionned role (e.g. ${config.prefix}color @Modrole FF0000) [You need : Manage Role]

**${config.prefix}help utility/music/fun/mod :** Send you some ~~*halp*~~ help (e.g. ${config.prefix}help fun)

**${config.prefix}level @mention :** Send level of the mentionned user (e.g. ${config.prefix}level @Nøtavøne)

**${config.prefix}nick @mention "new name":** Change the name of @mention (e.g. ${config.prefix}nick @RanDoMGUy#1210 Randomguy) [You need : Manage Nicknames]

**${config.prefix}ping :** Send information about the time

**${config.prefix}poll :** Do this command to have the syntax [You need : Mention Everyone]

**${config.prefix}solve :** Solve an equation (e.g. ${config.prefix}solve 3x + 1 = 10)
        `);

    const UtilityEmbed2 = new Discord.RichEmbed()
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setTimestamp()
        .setDescription(`
**${config.prefix}server info/emojis :** Send information or emojis of the server you're on

**${config.prefix}shorten "link" :** Shorten the link you've specified (e.g. ${config.prefix}shorten https://www.google.com/ usefull_desc)

**${config.prefix}todo "message" :** Help me adding new features or improvments ! (e.g. ${config.prefix}todo Fix every single bug (don't expect this to happen <:kappa:436421096841936896>))

**${config.prefix}twitch :** Do this command to have the syntax [You need : Mention Everyone]

**${config.prefix}unshorten "link" :** Unshorten the specified link (e.g. ${config.prefix}unshorten <https://v.gd/113RANDOM453NUMBER41OR453LINK>)

**${config.prefix}userinfo @mention :** Send some informations about @mention (e.g. ${config.prefix}userinfo @RanDoMGUy#1210)

**${config.prefix}botinfo :** Send informations about myself

**${config.prefix}weather "city":** Send informations about the weather in a city (e.g. ${config.prefix}weather Las Vegas)

**${config.prefix}forecast "city":** Send informations about the weather forecast for a city (e.g. ${config.prefix}forecast Las Vegas)

**${config.prefix}emoji :** Do this command to have the syntax [You need : Manage Emojis]

**${config.prefix}version :** Send informations about my current version

**${config.prefix}translate :** translate text from a language to another (e.g. ${config.prefix}translate english french My name is Jeff)
        `);
    // Music
    const MusicEmbed = new Discord.RichEmbed()
        .setAuthor('Music Commands', 'https://i.imgur.com/yRWZBEC.png')
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setThumbnail("https://i.imgur.com/yRWZBEC.png")
        .setTimestamp()
        .setDescription(`
**${config.prefix}play "link or research (supports playlist)" :** Play music even if they're shitty (I don't judge) (e.g. ${config.prefix}play despacito (<:notlikethis:436424258470543370>))

**${config.prefix}stop :** Stop the music [You need : DJ role]

**${config.prefix}skip :** Skip the current music [You need : DJ role]

**${config.prefix}now :** Show the current music

**${config.prefix}pause :** Pause the stream [You need : DJ role]

**${config.prefix}resume :** Resume the stream [You need : DJ role]

**${config.prefix}repeat "on/off" :** Activate or desactivate repeat mode [You need : DJ role]

**${config.prefix}queue :** Send queue with interactive menu if there are more than 10 songs queued

**${config.prefix}volume "1/100" :** Change actual volume from 1 to 100 (e.g. ${config.prefix}volume 42) [You need : DJ role]
        `);

    // Moderation
    const ModerationEmbed = new Discord.RichEmbed()
        .setAuthor("Moderation Commands", "https://i.imgur.com/4zVsVKv.png")
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setThumbnail("https://i.imgur.com/4zVsVKv.png")
        .setTimestamp()
        .setDescription(`
**${config.prefix}kick @mention :** Kick the specified member (e.g. ${config.prefix}kick @Fckng_idiot_32) [You need : Kick Members]

**${config.prefix}ban @mention :** Ban the specified member (e.g. ${config.prefix}kick @Fckng_moron_32) [You need : Ban Members]

**${config.prefix}clear "1/100" :** Clear the specified number of message from 1 to 100 (e.g. ${config.prefix}clear 42) [You need : Manage Messages]

**${config.prefix}mute @mention :** Mute the mentionned user (e.g. ${config.prefix}mute @Fckng_moron_32) [You need : Mute Members]

**${config.prefix}tempmute @mention "time" :** Mute the mentionned user for the desired time amount (e.g. ${config.prefix}tempmute @Fckng_idiot_32 2years) [You need : Mute Members]

**${config.prefix}unmute @mention :** Unmute the mentionned user (e.g. ${config.prefix}unmute @Mutedguy_74) [You need : Mute Members]
        `);
    // Fun
    const FunEmbed = new Discord.RichEmbed()
        .setAuthor("Funny Commands", "https://i.imgur.com/5UQt1Qb.png")
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setThumbnail("https://i.imgur.com/5UQt1Qb.png")
        .setTimestamp()
        .setDescription(`
**${config.prefix}wow :** useful command please don't use it <:kappa:436421096841936896>

**${config.prefix}say "message" :** Make me say something (e.g. ${config.prefix}say Hello i'm useless) [You need : Manage Messages]

**${config.prefix}roll "number" :** Roll a number (e.g. ${config.prefix}roll 10)

**${config.prefix}flip :** Do a coin-flip

**${config.prefix}dog :** Send random doggo image

**${config.prefix}cofee :** Send random dofee image

**${config.prefix}cat :** Send random image of the devil (currently unavalaible, sorry)

**${config.prefix}joke :** Send random dad joke

**${config.prefix}pat @mention :** Pat the mentionned user (e.g. ${config.prefix}pat @RanDoMGUy#1210)

**${config.prefix}faker :** Send random informations
    `);

    if (args[0] === 'utility') {
        message.author.send(UtilityEmbed1).then(() => message.author.send(UtilityEmbed2));
        message.delete(2000);

    } else if (args[0] === 'music') {
        message.author.send(MusicEmbed);
        message.delete(2000);

    } else if (args[0] === 'mod') {
        message.author.send(ModerationEmbed);
        message.delete(2000);

    } else if (args[0] === 'fun') {
        message.author.send(FunEmbed);
        message.delete(2000);

    } else {
        message.author.send(UtilityEmbed1).then(() => message.author.send(UtilityEmbed2))
            .then(() => message.author.send(FunEmbed))
            .then(() => message.author.send(ModerationEmbed))
            .then(() => message.author.send(MusicEmbed));
        message.delete(2000);
    };
};
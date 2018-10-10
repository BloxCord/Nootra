const config = require('../storage/globalSettings.js');
const Discord = require('discord.js');
const global = require('../function/global.js');
const fs = require('fs');

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    let prefix = serverSettings[message.guild.id].prefix;
    global.del(message, 5000);

    // EMBEDS

    //Utility
    const UtilityEmbed1 = new Discord.RichEmbed()
        .setAuthor("Utility Commands", "https://png.icons8.com/dusk/64/000000/settings.png")
        .setColor('FF0000')
        .setThumbnail("https://png.icons8.com/dusk/64/000000/settings.png")
        .setDescription(`
**${prefix}announce :** Do this command to have the syntax [You need : Mention Everyone]

**${prefix}ask "string" :** Respond to question (e.g. ${prefix}ask Am I the best bot in here ? (obvious answer <:kappa:436421096841936896>))

**${prefix}avatar @user :** Respond with avatar (e.g. ${prefix}avatar @RanDoMGUy#1210)

**${prefix}changelog :** Send the changelog

**${prefix}color @role "string" :** Change the color of the mentionned role (e.g. ${prefix}color @Modrole FF0000) [You need : Manage Role]

**${prefix}help utility/music/fun/mod :** Send you some ~~*halp*~~ help (e.g. ${prefix}help fun)

**${prefix}level @user :** Send level of the mentionned user (e.g. ${prefix}level @Nøtavøne)

**${prefix}nick @user "string":** Change the name of @mention (e.g. ${prefix}nick @RanDoMGUy#1210 Randomguy) [You need : Manage Nicknames]

**${prefix}ping :** Send information about the time

**${prefix}poll :** Do this command to have the syntax [You need : Mention Everyone]

**${prefix}solve "string" :** Solve an equation (e.g. ${prefix}solve 3x + 1 = 10)

**${prefix}server info/emojis :** Send information or emojis of the server you're on

**${prefix}shorten "string" :** Shorten the link you've specified (e.g. ${prefix}shorten https://www.google.com/ usefull_desc)

**${prefix}todo "string" :** Help me adding new features or improvments ! (e.g. ${prefix}todo Fix every single bug (don't expect this to happen <:kappa:436421096841936896>))
        
**${prefix}weather "string" :** Send informations about the weather in a city (e.g. ${prefix}weather Las Vegas)
`);

    const UtilityEmbed2 = new Discord.RichEmbed()
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setTimestamp()
        .setDescription(`
**${prefix}forecast "string" :** Send informations about the weather forecast for a city (e.g. ${prefix}forecast Las Vegas)

**${prefix}emoji :** Do this command to have the syntax [You need : Manage Emojis]

**${prefix}version :** Send informations about my current version

**${prefix}twitch :** Do this command to have the syntax [You need : Mention Everyone]

**${prefix}unshorten "string" :** Unshorten the specified link (e.g. ${prefix}unshorten <https://v.gd/113RANDOM453NUMBER41OR453LINK>)

**${prefix}userinfo @user :** Send some informations about @mention (e.g. ${prefix}userinfo @RanDoMGUy#1210)

**${prefix}botinfo :** Send informations about myself

**${prefix}math "math stuff" :** Do the magic math (e.g. ${prefix}math pi^2)

**${prefix}translate "lang1" "lang2" "string" :** translate text from a language to another (e.g. ${prefix}translate english french My name is Jeff)
        `);
    // Music
    const MusicEmbed = new Discord.RichEmbed()
        .setAuthor('Music Commands', 'https://png.icons8.com/dusk/64/000000/speaker.png')
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setThumbnail("https://png.icons8.com/dusk/64/000000/speaker.png")
        .setTimestamp()
        .setDescription(`
**${prefix}play "string" :** Play music even if they're shitty (I don't judge) (e.g. ${prefix}play despacito (<:notlikethis:436424258470543370>))

**${prefix}playsearch "string" :** search for music or videos and let you choose which one to play (e.g. ${prefix}playsearch Some random things)

**${prefix}stop :** Stop the music [You need : DJ role]

**${prefix}skip :** Skip the current music [You need : DJ role]

**${prefix}now :** Show the current music

**${prefix}pause :** Pause the stream [You need : DJ role]

**${prefix}resume :** Resume the stream [You need : DJ role]

**${prefix}repeat "on/off" :** Activate or desactivate repeat mode [You need : DJ role]

**${prefix}queue :** Send queue with interactive menu if there are more than 10 songs queued

**${prefix}volume "1/100" :** Change actual volume from 1 to 100 (e.g. ${prefix}volume 42) [You need : DJ role]
        `);

    // Moderation
    const ModerationEmbed = new Discord.RichEmbed()
        .setAuthor("Moderation Commands", "https://png.icons8.com/plasticine/64/000000/crown.png")
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setThumbnail("https://png.icons8.com/plasticine/64/000000/crown.png")
        .setTimestamp()
        .setDescription(`
**${prefix}kick @user :** Kick the specified member (e.g. ${prefix}kick @Fckng_idiot_32) [You need : Kick Members]

**${prefix}ban @user :** Ban the specified member (e.g. ${prefix}kick @Fckng_moron_32) [You need : Ban Members]

**${prefix}clear "1/100" :** Clear the specified number of message from 1 to 100 (e.g. ${prefix}clear 42) [You need : Manage Messages]

**${prefix}mute @user :** Mute the mentionned user (e.g. ${prefix}mute @Fckng_moron_32) [You need : Mute Members]

**${prefix}tempmute @user "time" :** Mute the mentionned user for the desired time amount (e.g. ${prefix}tempmute @Fckng_idiot_32 2years) [You need : Mute Members]

**${prefix}unmute @user :** Unmute the mentionned user (e.g. ${prefix}unmute @Mutedguy_74) [You need : Mute Members]
        `);
    // Fun
    const FunEmbed = new Discord.RichEmbed()
        .setAuthor("Funny Commands", "https://png.icons8.com/dusk/64/000000/confetti.png")
        .setColor('FF0000')
        .setFooter(config.name, config.avatar)
        .setThumbnail("https://png.icons8.com/dusk/64/000000/confetti.png")
        .setTimestamp()
        .setDescription(`
**${prefix}wow :** useful command please don't use it <:kappa:436421096841936896>

**${prefix}say "string" :** Make me say something (e.g. ${prefix}say Hello i'm useless) [You need : Manage Messages]

**${prefix}roll "string" :** Roll a number (e.g. ${prefix}roll 10)

**${prefix}flip :** Do a coin-flip

**${prefix}ascii "string" :** Do some ascii things

**${prefix}dog :** Send random doggo image

**${prefix}cofee :** Send random dofee image

**${prefix}cat :** Send random image of the devil (currently unavalaible, sorry)

**${prefix}joke :** Send random dad joke

**${prefix}pat @user :** Pat the mentionned user (e.g. ${prefix}pat @RanDoMGUy#1210)

**${prefix}faker :** Send random informations

**${prefix}fortnite "username" "pc/xbl/psn" :** Send stats from fortnite tracker for the username

**${prefix}wcup "year" :** Information about the football world cup
    `);

    if (args[0] === 'utility') {
        message.author.send(UtilityEmbed1).then(() => message.author.send(UtilityEmbed2));

    } else if (args[0] === 'music') {
        message.author.send(MusicEmbed);

    } else if (args[0] === 'mod') {
        message.author.send(ModerationEmbed);

    } else if (args[0] === 'fun') {
        message.author.send(FunEmbed);

    } else {
        message.author.send(UtilityEmbed1)
            .then(() => message.author.send(UtilityEmbed2))
            .then(() => message.author.send(FunEmbed))
            .then(() => message.author.send(ModerationEmbed))
            .then(() => message.author.send(MusicEmbed));
    }
};
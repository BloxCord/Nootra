// Require / Dependancies //
const Discord = require("discord.js");
const {
    Client,
    Util
} = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const ms = require('ms');
const fs = require('fs');
const sql = require('sqlite');
const config = require("../config.js");
const espion = require('../function/espion.js');
const client = new Discord.Client();
////////////////////////////

sql.open('./db/levels.sqlite')

let cooldown = new Set();

const youtube = new YouTube(config.api_youtube);

var varrepeat = false;

const queue = new Map();

exports.run = async (client, message) => {

    // Shortcuts
    var msg = message.content;
    var author = message.author;
    var channel = message.channel;
    var guild = message.guild;
    var user = message.member;

    // Security
    const err_embed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setAuthor('[ERROR ❌]')
        .setDescription(`I don't respond to direct messages, sorry! [\`❌\`]`)

    if (message.channel.type === 'dm' && message.author.id !== config.id) {
        return author.send(err_embed)
    }
    if (author.bot) return;

    // Command
    const args = msg.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var content = args.join(' ');

    espion.message_sent(client, message);

    // Command handler
    if (msg.startsWith(config.prefix)) {
        try {
            var commandFile = require(`../commands/${command}.js`);
            if (commandFile) {
                if (cooldown.has(`${author.id}-${command}`)) return
                else {
                    if (message.author.id !== config.admin) cooldown.add(`${author.id}-${command}`);
                    commandFile.run(client, message, args);
                    setTimeout(() => {
                        cooldown.delete(`${author.id}-${command}`);
                    }, ms(commandFile.timer));
                }
            }
        } catch (error) {

        }
    }

    // Utility : Réaction
    if (channel.id === '416252497854988288') {
        message.react("✅").then(() => {
            message.react("❌")
        })
    };

    // Eval
    function clean(text) {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    if (message.author.id === config.admin) {
        if (message.content.match(/^\`\`\`(js|javascript)\n/)) {
            var code = message.content.split(/^\`\`\`(js|javascript)\n/).pop().split('```')[0]
            try {
                let evaled = eval(code);
                if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

                const yes = client.emojis.find('id', '435603381818490880')
                if (message) message.react(yes.id).then(() => message.delete(2000))
            } catch (err) {
                try {
                    const no = client.emojis.find('id', '435603381269037057')
                    if (message) message.react(no.id).then(() => message.delete(2000))
                    return message.channel.send(clean(err), {
                        code: "js"
                    });

                } catch (error) {
                    return message.channel.send(error)
                }
            }
        }
    }

    // Levels
    sql.get(`SELECT * FROM levels WHERE ID ="${message.author.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO levels (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 1]);
        } else {
            let curLevelp = 0.1 * Math.sqrt(row.points + 1);
            let curLevel = Math.floor(curLevelp)
            if (curLevelp > row.level) {
                sql.run(`UPDATE levels SET points = ${row.points + 1}, level = ${row.level + 1} WHERE ID = ${message.author.id}`);
                const levelup = new Discord.RichEmbed()
                    .setAuthor('Levels', 'https://png.icons8.com/trophy/dusk/50')
                    .setColor('FF0000')
                    .setDescription(`Congratulation ${message.author} who is now level **${row.level}** !\n("${config.prefix}level" for information)`)
                    .setFooter(config.name, config.avatar)
                if (curLevel === 0) return;
                else channel.send(levelup)
            }
            if (message.guild.id === '417305635168845825' || message.guild.id === '110373943822540800') sql.run(`UPDATE levels SET points = ${row.points} WHERE ID = ${message.author.id}`)
            else sql.run(`UPDATE levels SET points = ${row.points + 1} WHERE ID = ${message.author.id}`)
        }
    }).catch((error) => {
        console.log(error)
        espion.new_error(client, error)
        sql.run("CREATE TABLE IF NOT EXISTS levels (ID TEXT, points INTEGER, level INTEGER)").then(() => {
            sql.run("INSERT INTO levels (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 1]);
        });
    });

    // Musique
    const searchString = content;
    const serverQueue = queue.get(message.guild.id);
    const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';

    if (command === 'play' && msg.startsWith(config.prefix)) {

        const voiceChannel = message.member.voiceChannel;

        if (!voiceChannel) return message.reply("you're not in a vocal channel.")

        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has('CONNECT')) return message.reply("I can't connect in this channel.")
        if (!permissions.has('SPEAK')) return message.reply("I can't talk in this channel.")

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, voiceChannel, true);
            }
            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Play', 'https://i.imgur.com/yRWZBEC.png')
                .setDescription(`Added "${playlist.title}" to queue!`)
            return channel.send(embed);
        } else {
            try {
                var video = await youtube.getVideo(url)
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (error) {
                    return espion.new_error(client, error)
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
        message.delete()
    } else if (command === 'skip' && msg.startsWith(config.prefix)) {

        var userrole = user.roles
        if (userrole === null) return
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {

            if (!message.member.voiceChannel) return message.reply("you're not in a vocal channel.")
            if (!serverQueue) return message.reply("nothing's playing.")

            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Skip', 'https://cdn.discordapp.com/attachments/418723354963476500/440139111085637633/skip-forward-365508ed23d37c2b-512x512.png')
                .setDescription(`Song skipped \`⏩\``)
            message.channel.send(embed)
            serverQueue.connection.dispatcher.end()
            message.delete(2000)
            return undefined;

        } else return message.reply("this command is restricted")
        message.delete()
    } else if (command === 'stop' && msg.startsWith(config.prefix)) {

        var userrole = user.roles
        if (userrole === null) return
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {

            if (!message.member.voiceChannel) return message.reply("you're not in a vocal channel.")
            if (!serverQueue) return message.reply("nothing's playing.")

            serverQueue.songs = [];

            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Stop', 'https://cdn.discordapp.com/attachments/418723354963476500/440138995075121155/ban-stop-icon-22.png')
                .setDescription(`Stop asked by ${message.author.username} \`🚫\``)
            message.channel.send(embed)
            serverQueue.connection.dispatcher.end()
            message.delete(2000)
            return undefined

        } else return message.reply("this command is restricted")
        message.delete()
    } else if (command === 'volume' && msg.startsWith(config.prefix)) {

        var userrole = user.roles
        if (userrole === null) return

        var volume = ''
        if (serverQueue.volume <= 10) var volume = '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬'
        else if (serverQueue.volume <= 20) var volume = '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬'
        else if (serverQueue.volume <= 30) var volume = '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬'
        else if (serverQueue.volume <= 40) var volume = '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬'
        else if (serverQueue.volume <= 50) var volume = '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬'
        else if (serverQueue.volume <= 60) var volume = '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬'
        else if (serverQueue.volume <= 70) var volume = '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬'
        else if (serverQueue.volume <= 80) var volume = '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬'
        else if (serverQueue.volume <= 90) var volume = '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬'
        else if (serverQueue.volume <= 100) var volume = '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)'

        if (message.author.id === config.admin || userrole.find('name', "DJ")) {

            if (!message.member.voiceChannel) return message.reply("you're not in a vocal channel.")
            if (!serverQueue) return message.reply("nothing's playing.")
            if (!args[0]) {
                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Volume', 'https://i.imgur.com/yRWZBEC.png')
                    .setDescription(`
Actual volume : **${serverQueue.volume}%**
\`[1]\` ${volume} \`[100] 🔊\`
                    `)
                return message.channel.send(embed)
            } else if (args[0] < 1 || args[0] > 100) return message.reply("you don't have access to those values (Authorized values : 1 to 100)")
            else {
                serverQueue.volume = args[0]
                serverQueue.connection.dispatcher.setVolume(args[0] / 100);

                var newvolume = ''
                if (serverQueue.volume <= 10) var newvolume = '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬'
                else if (serverQueue.volume <= 20) var newvolume = '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬'
                else if (serverQueue.volume <= 30) var newvolume = '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬'
                else if (serverQueue.volume <= 40) var newvolume = '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬'
                else if (serverQueue.volume <= 50) var newvolume = '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬'
                else if (serverQueue.volume <= 60) var newvolume = '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬'
                else if (serverQueue.volume <= 70) var newvolume = '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬'
                else if (serverQueue.volume <= 80) var newvolume = '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬'
                else if (serverQueue.volume <= 90) var newvolume = '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬'
                else if (serverQueue.volume <= 100) var newvolume = '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)'

                const embed = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Volume', 'https://i.imgur.com/yRWZBEC.png')
                    .setDescription(`
Volume is now set at **${args[0]}%**
\`[1]\` ${newvolume} \`[100] 🔊\`
                    `)
                return message.channel.send(embed)
            }
            message.delete(2000)

        } else return message.reply("this command is restricted")
        message.delete()
    } else if (command === 'now' && msg.startsWith(config.prefix)) {

        if (!serverQueue) return message.reply("nothing's playing.")

        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Now', 'https://i.imgur.com/yRWZBEC.png')
            .addField('Now playing:', `${serverQueue.songs[0].title} \`🔊\``)
            .setImage(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/maxresdefault.jpg`, serverQueue.songs[0].url, 100, 100)
        return channel.send(embed)
        message.delete()
    } else if (command === 'queue' && msg.startsWith(config.prefix)) {

        if (!serverQueue) return message.reply("nothing's playing.")

        let index = 0;
        let page = 1;

        let longArray = serverQueue.songs
        let shortArrays = [],
            i, len;

        for (i = 0, len = longArray.length; i < len; i += 10) {
            shortArrays.push(longArray.slice(i, i + 10));
        }

        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Queue', 'https://cdn.discordapp.com/attachments/418723354963476500/440138556699181057/layers.png')
            .setDescription(shortArrays[page - 1].map(song => `${song.title}`))
        if (shortArrays.length > 1) embed.setFooter(`Viewing page ${page} of ${shortArrays.length}`)
        channel.send(embed).then(msg => {
            if (shortArrays.length > 1) msg.react('⏪').then(() => {
                msg.react('🛑').then(() => msg.react('⏩'))
            })

            const backwards = msg.createReactionCollector((reaction) => reaction.emoji.name === '⏪', {
                time: ms('1day')
            });

            const forwards = msg.createReactionCollector((reaction) => reaction.emoji.name === '⏩', {
                time: ms('1day')
            });

            const page1 = msg.createReactionCollector((reaction) => reaction.emoji.name === '🛑', {
                time: ms('1day')
            });

            page1.on('end', msg => msg.clearReactions())

            function backward_reset() {
                embed.setDescription(shortArrays[page - 1].map(song => `${song.title}`));
                embed.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(embed)
            }

            function forward_reset() {
                embed.setDescription(shortArrays[page - 1].map(song => `${song.title}`));
                embed.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(embed)
            }

            function page1_reset() {
                embed.setDescription(shortArrays[page - 1].map(song => `${song.title}`));
                embed.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(embed)
            }

            backwards.on('collect', r => {
                if (user.id !== config.id) {
                    if (page === 1) return;
                    page--;
                    backward_reset()
                    r.remove(user.id)
                } else return;
            })

            forwards.on('collect', r => {
                if (user.id !== config.id) {
                    if (page === shortArrays.length) return;
                    page++;
                    forward_reset()
                    r.remove(user.id)
                } else return;
            })

            page1.on('collect', r => {
                if (user.id !== config.id) {
                    if (page === 1) return;
                    page = 1
                    page1_reset()
                    r.remove(user.id)
                } else return;
            })

        })

        message.delete()

    } else if (command === 'pause' && msg.startsWith(config.prefix)) {

        var userrole = user.roles
        if (userrole === null) return
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {

            if (serverQueue && serverQueue.playing === true) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
            }

            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Pause', 'https://cdn.discordapp.com/attachments/418723354963476500/440138092242796548/Pause-Normal-Red-icon.png')
                .setDescription(`Stream paused by ${message.author.username}`)
            return message.channel.send(embed)
            message.delete()
        }
    } else if (command === 'resume' && msg.startsWith(config.prefix)) {

        var userrole = user.roles
        if (userrole === null) return
        if (message.author.id === config.admin || userrole.find('name', "DJ")) {

            if (!serverQueue.playing === false) {
                if (!serverQueue) return message.reply("nothing's playing.")
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
            }

            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Resume', 'https://cdn.discordapp.com/attachments/418723354963476500/440138038941712406/580b57fcd9996e24bc43c4fa.png')
                .setDescription(`Stream resumed by ${message.author.username}`)
            return message.channel.send(embed)
            message.delete()
        }
    } else if (command === 'repeat' && msg.startsWith(config.prefix)) {

        if (args[0] === 'on') {
            const true_embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Repeat', 'https://cdn.discordapp.com/attachments/418723354963476500/440137725748707329/repeat.png')
                .setDescription(`**Repeat mode : on** \`✅\``)
            varrepeat = true
            message.channel.send(true_embed)
        } else if (args[0] === 'off') {
            const false_embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Repeat', 'https://cdn.discordapp.com/attachments/418723354963476500/440137725748707329/repeat.png')
                .setDescription(`**Repeat mode : off** \`✅\``)
            varrepeat = false
            message.channel.send(false_embed)
        }
    }

}

async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    const song = {
        id: video.id,
        title: (video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 50,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);

        if (varrepeat === false) queueConstruct.songs.push(song);
        else queueConstruct.songs.push(serverQueue.song)

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.log(error)
            return espion.new_error(client, error)
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) return undefined;
        else {
            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Play', 'https://i.imgur.com/yRWZBEC.png')
                .setDescription(`\`${song.title}\` added to queue !`)
            return message.channel.send(embed)
        }
    }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id)

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
        filter: "audioonly"
    }))
    dispatcher.on('end', () => {
        try {
            const embed = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Music', 'https://i.imgur.com/yRWZBEC.png')
                .setDescription(`Queue ended.`)
            if (!serverQueue) {
                voiceChannel.leave()
                return message.channel.send(embed)
            }
            if (varrepeat === true) play(guild, serverQueue.songs[0])
            else {
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0])
            }
        } catch (error) {
            console.log(error)
            return espion.new_error(client, error)
            voiceChannel.leave()
        }
    })
    dispatcher.on('error', error => {
        console.log(error)
        return espion.new_error(client, error)
    })
    dispatcher.setVolume(serverQueue.volume / 100);
    const embed = new Discord.RichEmbed()
        .setColor("FF0000")
        .setAuthor('Play', 'https://i.imgur.com/yRWZBEC.png')
        .setTitle('Direct link')
        .setURL(song.url)
        .setImage(`https://i.ytimg.com/vi/${song.id}/maxresdefault.jpg`)
        .addField("Now playing :", song.title, false)
        .setTimestamp()
    serverQueue.textChannel.send(embed)
}
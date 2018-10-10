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
const config = require("../storage/globalSettings.js");
const espion = require('../function/espion.js');
const global = require('../function/global.js');
////////////////////////////

const youtube = new YouTube(config.apiYoutube);
sql.open('./storage/levels.sqlite');
var cooldown = new Set();
var serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));
var queue = new Map();

exports.run = async (client, message) => {

    // Security
    if (message.channel.type === 'dm') {
        return message.author.send(new Discord.RichEmbed()
            .setColor('FF0000')
            .setAuthor('[ERROR ❌]')
            .setDescription(`I don't respond to direct messages, sorry!`)
        );
    } else if (message.author.bot) {
        return;
    } else if (message.length >= 1400) {
        return;
    }

    if (config.id !== '416534697703636993') {
        if (message.channel.id === '444773528479334400') {
            global.del(message, 2000);
        }
    }

    if (!serverSettings[message.guild.id]) {
        serverSettings[message.guild.id] = {
            prefix: "!",
            language: 'english',
            level: 'on'
        };

        fs.writeFile('./storage/serverSettings.json', JSON.stringify(serverSettings), (err) => {
            if (err) {
                return espion.newError(client, err, __filename);
            }
        });
    }

    // Command
    const args = message.content.slice(serverSettings[message.guild.id].prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var content = args.join(' ');

    espion.messageSent(client, message);

    // Command handler
    if (message.content.startsWith(serverSettings[message.guild.id].prefix)) {
        try {
            var commandFile = require(`../commands/${command}.js`);
            if (commandFile) {
                if (commandFile.timer) {
                    if (cooldown.has(`${message.author.id}-${command}`)) {
                        return;
                    } else {
                        if (message.author.id !== config.admin) {
                            cooldown.add(`${message.author.id}-${command}`);
                        }
                        setTimeout(() => {
                            cooldown.delete(`${message.author.id}-${command}`);
                        }, ms(commandFile.timer));
                    }
                }
            }

            console.log(`${message.author.tag} ran ${command} command`);
            commandFile.run(client, message, args);

        } catch (error) {

        }
    }

    if (message.author.id === config.admin) {
        if (message.content.match(/^\`\`\`(eval|javascript)\n/)) {

            global.del(message, 5000);

            var code = message.content.split(/^\`\`\`(eval|javascript)\n/).pop().split('```')[0];
            try {
                var evaled = eval(code);
                console.log(evaled);
                if (typeof evaled !== "string") {
                    evaled = require("util").inspect(evaled);
                }

                return message.channel.send(new Discord.RichEmbed()
                    .addField("\`📥\` **Input**", message.content, false)
                    .addField("\`📤\` **Output**", `\`\`\`js\n${global.clean(evaled)}\`\`\``, false)
                    .setColor('FF0000')
                ).then((msg) => msg.react(global.searchEmoji(client, '435603381818490880').id));
            } catch (err) {
                console.log(err);
                return message.channel.send(new Discord.RichEmbed()
                    .addField("\`📥\` **Input**", message.content, false)
                    .addField("\`📤\` **Output**", `\`\`\`js\n${global.clean(err.toString())}\`\`\``)
                    .setColor('FF0000')
                ).then((msg) => msg.react(global.searchEmoji(client, '435603381269037057').id));
            }
        }
    }

    // Levels
    sql.get(`SELECT * FROM levels WHERE ID ="${message.author.id}"`).then((row) => {
        if (!row) {
            sql.run("INSERT INTO levels (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 1]);
        } else {
            var curLevelp = 0.1 * Math.sqrt(row.points + 1);
            var curLevel = Math.floor(curLevelp);
            if (curLevelp > row.level) {
                sql.run(`UPDATE levels SET points = 1, level = ${row.level + 1} WHERE ID = ${message.author.id}`);
                const levelUp = new Discord.RichEmbed()
                    .setAuthor('Levels', 'https://png.icons8.com/trophy/dusk/50')
                    .setColor('FF0000')
                    .setDescription(`Congratulation, ${message.author} is now level **${row.level}** !\n("${serverSettings[message.guild.id].prefix}level" for information)`)
                    .setFooter(config.name, config.avatar);
                message.channel.send(levelUp);
            }
            if (serverSettings.level === false) {
                sql.run(`UPDATE levels SET points = ${row.points} WHERE ID = ${message.author.id}`);
            } else {
                sql.run(`UPDATE levels SET points = ${row.points + 1} WHERE ID = ${message.author.id}`);
            }
        }
    }).catch((error) => {
        console.log(error);
        espion.newError(client, error, __filename);
        sql.run("CREATE TABLE IF NOT EXISTS levels (ID TEXT, points INTEGER, level INTEGER)").then(() => {
            sql.run("INSERT INTO levels (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 1]);
        });
    });

    // Musique
    var searchString = content;
    var serverQueue = queue.get(message.guild.id);
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var voiceChannel = message.member.voiceChannel;

    if (command === 'play' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);
        if (!voiceChannel) {
            return message.reply("you're not in a vocal channel.");
        }
        var permissions = voiceChannel.permissionsFor(message.member);

        if (!permissions.has('CONNECT')) {
            return message.reply("I can't connect in this channel.");
        }
        if (!permissions.has('SPEAK')) {
            return message.reply("I can't talk in this channel.");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            var playlist = await youtube.getPlaylist(url);
            var videos = await playlist.getVideos();
            for (var video of Object.values(videos)) {
                var video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, voiceChannel, true);
            }
            const musicPlaylistAdd = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Play', 'https://png.icons8.com/play/dusk/50')
                .setDescription(`Added "${playlist.title}" to queue!`);
            return message.channel.send(musicPlaylistAdd);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (error) {
                    return espion.newError(client, error, __filename);
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    }

    if (command === 'skip' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);
        var memberRole = message.member.roles;
        if (memberRole === null) {
            return;
        }
        if (message.author.id === config.admin || memberRole.find((role) => role.name === 'DJ')) {
            if (!message.member.voiceChannel) {
                return message.reply("you're not in a vocal channel.");
            }
            if (!serverQueue) {
                return message.reply("nothing's playing.");
            }
            const musicSkip = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Skip', 'https://png.icons8.com/chevron_right/dusk/50')
                .setDescription(`Song skipped \`⏩\``);
            message.channel.send(musicSkip);
            serverQueue.connection.dispatcher.end();
            return undefined;
        } else {
            return message.reply("this command is restricted");
        }
    }

    if (command === 'stop' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);
        if (memberRole === null) {
            return;
        }
        if (message.author.id === config.admin || memberRole.find((role) => role.name === 'DJ')) {
            if (!message.member.voiceChannel) {
                return message.reply("you're not in a vocal channel.");
            }
            if (!serverQueue) {
                return message.reply("nothing's playing.");
            }
            serverQueue.songs = [];
            const musicStop = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor('Stop', 'https://png.icons8.com/stop/dusk/50')
                .setDescription(`Stop asked by ${message.author.username} \`🚫\``);
            message.channel.send(musicStop);
            serverQueue.connection.dispatcher.end();
            return undefined;
        } else {
            return message.reply("this command is restricted");
        }
    }

    if (command === 'volume' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);
        if (memberRole === null) {
            return;
        }
        var volume = serverQueue.volume <= 10 ? '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬' : serverQueue.volume <= 20 ? '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬' : serverQueue.volume <= 30 ? '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬' : serverQueue.volume <= 40 ? '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬' : serverQueue.volume <= 50 ? '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬' : serverQueue.volume <= 60 ? '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬' : serverQueue.volume <= 70 ? '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬' : serverQueue.volume <= 80 ? '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬' : serverQueue.volume <= 90 ? '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬' : '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)';
        if (message.author.id === config.admin || memberRole.find((role) => role.name === 'DJ')) {
            if (!message.member.voiceChannel) {
                return message.reply("you're not in a vocal channel.");
            }
            if (!serverQueue) {
                return message.reply("nothing's playing.");
            }
            if (!args[0]) {
                const musicVolume = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Volume', 'https://png.icons8.com/audio/dusk/50')
                    .setDescription(`
Actual volume : **${serverQueue.volume}%**
\`[1%]\` ${volume} \`[100%] 🔊\`
                    `);
                return message.channel.send(musicVolume);
            } else if (args[0] < 1 || args[0] > 100) {
                return message.reply("you don't have access to those values (Authorized values : 1 to 100)");
            } else if (args[0] === NaN) {
                return message.reply(`"${args[0]}" is not a number.`);
            } else {
                serverQueue.volume = args[0];
                serverQueue.connection.dispatcher.setVolume(args[0] / 100);

                var newvolume = serverQueue.volume <= 10 ? '[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬' : serverQueue.volume <= 20 ? '[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬' : serverQueue.volume <= 30 ? '[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬' : serverQueue.volume <= 40 ? '[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬' : serverQueue.volume <= 50 ? '[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬' : serverQueue.volume <= 60 ? '[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬' : serverQueue.volume <= 70 ? '[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬' : serverQueue.volume <= 80 ? '[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬' : serverQueue.volume <= 90 ? '[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬' : '[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)';

                const musicVolume = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Volume', 'https://png.icons8.com/audio/dusk/50')
                    .setDescription(`
Volume is now set at **${args[0]}%**
\`[1%]\` ${newvolume} \`[100%] 🔊\`
                    `);
                return message.channel.send(musicVolume);
            }

        } else {
            return message.reply("this command is restricted");
        }
    }

    if (command === 'now' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);
        if (!serverQueue) {
            return message.reply("nothing's playing.");
        }
        const musicNp = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Now', 'https://png.icons8.com/play/dusk/50')
            .addField('Now playing:', `${serverQueue.songs[0].title} \`🔊\``)
            .setImage(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/maxresdefault.jpg`, serverQueue.songs[0].url, 100, 100);
        return message.channel.send(musicNp);
    }
    if (command === 'queue' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);

        if (!serverQueue) {
            return message.reply("nothing's playing.");
        }
        var number = 1;
        var page = 1;
        var shortArrays = global.arrayList(serverQueue.songs, 10);
        const musicQueue = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Queue', 'https://png.icons8.com/sorting/dusk/50')
            .setDescription(`${shortArrays[page - 1].map((song) => `\`#${number++}\` : [${song.title}](${song.url}) **${ms(song.duration)}**`).join('\n')}\nDFGDG`);
        if (shortArrays.length > 1) {
            musicQueue.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
        }
        message.channel.send(musicQueue).then((msg) => {
            if (shortArrays.length > 1) {
                msg.react('⏪').then(() => {
                    msg.react('🛑').then(() => msg.react('⏩'));
                });
            }

            msg.createReactionCollector((reaction) => reaction.emoji.name === '⏪', {
                time: ms('1day')
            }).on('collect', (r) => {
                r.remove(message.member.id);
                if (page === 1) {
                    return;
                }
                number = number - (10 + shortArrays[page - 1].length);
                page--;
                musicQueue.setDescription(`${shortArrays[page - 1].map((song) => `\`#${number++}\` : [${song.title}](${song.url}) **${ms(song.duration)}**`).join('\n')}\nDFGDG`);
                musicQueue.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(musicQueue);
            });

            msg.createReactionCollector((reaction) => reaction.emoji.name === '⏩', {
                time: ms('1day')
            }).on('collect', (r) => {
                r.remove(message.member.id);
                if (page === shortArrays.length) {
                    return;
                }
                page++;
                musicQueue.setDescription(`${shortArrays[page - 1].map((song) => `\`#${number++}\` : [${song.title}](${song.url}) **${ms(song.duration)}**`).join('\n')}\nDFGDG`);
                musicQueue.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(musicQueue);
            });

            msg.createReactionCollector((reaction) => reaction.emoji.name === '🛑', {
                time: ms('1day')
            }).on('collect', (r) => {
                r.remove(message.member.id);
                if (page === 1) {
                    return;
                }
                number = 1;
                page = 1;
                musicQueue.setDescription(`${shortArrays[page - 1].map((song) => `\`#${number++}\` : [${song.title}](${song.url}) **${ms(song.duration)}**`).join('\n')}\nDFGDG`);
                musicQueue.setFooter(`Viewing page ${page} of ${shortArrays.length}`);
                msg.edit(musicQueue);
            });
        });
    }

    if (command === 'pause' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);
        if (memberRole === null) {
            return;
        }
        if (message.author.id === config.admin || memberRole.find((role) => role.name === 'DJ')) {
            if (serverQueue && serverQueue.playing === true) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                const musicPause = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Pause', 'https://png.icons8.com/stop/dusk/50')
                    .setDescription(`Stream paused by ${message.author.username}`);
                return message.channel.send(musicPause);
            }
        }
    }

    if (command === 'resume' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);
        if (memberRole === null) {
            return;
        }
        if (message.author.id === config.admin || memberRole.find((role) => role.name === 'DJ')) {
            if (serverQueue && serverQueue.playing === false) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                const musicResume = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Resume', 'https://png.icons8.com/resume_button/dusk/50')
                    .setDescription(`Stream resumed by ${message.author.username}`);
                return message.channel.send(musicResume);
            }
        }
    }

    if (command === 'repeat' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);

        var musicRepeat = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Repeat', 'https://png.icons8.com/repeat/dusk/50');
        if (args[0] === 'true') {
            serverQueue.repeat = true;
            const trueEmbed = musicRepeat.setDescription(`**Repeat mode : ${serverQueue.repeat}** \`✅\``);
            return message.channel.send(trueEmbed);
        } else if (args[0] === 'false') {
            serverQueue.repeat = false;
            const falseEmbed = musicRepeat.setDescription(`**Repeat mode : ${serverQueue.repeat}** \`✅\``);
            return message.channel.send(falseEmbed);
        } else if (args[0] === 'toggle') {
            serverQueue.repeat = !serverQueue.repeat;
            const toggleEmbed = musicRepeat.setDescription(`**Repeat mode toggled to : ${serverQueue.repeat}** \`✅\``);
            return message.channel.send(toggleEmbed);
        }
    } else if (command === 'playsearch' && message.content.startsWith(serverSettings[message.guild.id].prefix)) {

        global.del(message, 5000);

        try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;
            const musicSelection = new Discord.RichEmbed()
                .setColor('FF0000')
                .setAuthor('Song Selection', 'https://png.icons8.com/play/dusk/50')
                .setDescription(`
${videos.map((video2) => `**${++index}** : \`${video2.title}\``).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.        
`);
            message.channel.send(musicSelection).then((selectionmsg) => {
                global.del(selectionmsg, 22000);
            });
            try {
                var response = await message.channel.awaitMessages((msg2) => msg2.content >= 1 && msg2.content <= 10, {
                    maxMatches: 1,
                    time: 20000,
                    errors: ['time']
                });
                const videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                global.del(response.first());
                return handleVideo(video, message, voiceChannel);
            } catch (error) {
                return message.channel.send('No or invalid value entered, cancelling video selection.').then(((msg) => {
                    global.del(msg, 2000);
                }));
            }
        } catch (error) {
            return message.channel.send('🆘 I couldn\'t get any search results.').then((msg) => {
                global.del(msg, 2000);
            });
        }
    }

    async function handleVideo(video, message, voiceChannel, playlist = false) {
        const serverQueue = queue.get(message.guild.id);
        var duration = ms(`${video.duration.days}days`) + ms(`${video.duration.hours}hours`) + ms(`${video.duration.minutes}minutes`) + ms(`${video.duration.seconds}seconds`) + ms(`${video.duration.weeks}weeks`) + ms(`${video.duration.years}years`);

        const song = {
            id: video.id,
            title: (video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`,
            duration: duration
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 50,
                playing: true,
                repeat: false,
            };
            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.log(error);
                return espion.newError(client, error, __filename);
            }
        } else {
            serverQueue.songs.push(song);
            if (playlist) {
                return undefined;
            } else {
                const musicSongAdd = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor('Play', 'https://png.icons8.com/play/dusk/50')
                    .setDescription(`\`${song.title}\` added to queue !`);
                return message.channel.send(musicSongAdd);
            }
        }
    }

    function play(guild, song) {
        const serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            return queue.delete(guild.id);
        }

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
            filter: "audioonly"
        }));
        dispatcher.on('end', () => {
            try {
                if (serverQueue.repeat === true) {
                    return play(guild, serverQueue.songs[0]);
                } else {
                    serverQueue.songs.shift();
                    return play(guild, serverQueue.songs[0]);
                }
            } catch (error) {
                serverQueue.voiceChannel.leave();
                console.log(error);
                return espion.newError(client, error, __filename);
            }
        });
        dispatcher.on('error', (error) => {
            console.log(error);
            espion.newError(client, error, __filename);
            return serverQueue.textChannel.send(`I had to stop playing music because :\n\`\`\`${error}\`\`\``);
        });
        dispatcher.setVolume(serverQueue.volume / 100);
        const musicPlay = new Discord.RichEmbed()
            .setColor("FF0000")
            .setAuthor('Play', 'https://png.icons8.com/play/dusk/50')
            .setTitle('Direct link')
            .setURL(song.url)
            .setImage(`https://i.ytimg.com/vi/${song.id}/maxresdefault.jpg`)
            .addField("Now playing :", song.title, false)
            .setTimestamp();
        return serverQueue.textChannel.send(musicPlay);
    }
};
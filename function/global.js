const config = require("../storage/globalSettings.js");
const logger = require("../function/logger");
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const ytdl = require("ytdl-core");

var serverSettings = JSON.parse(fs.readFileSync("./storage/serverSettings.json", "utf8"));

/*eslint-disable arrow-body-style*/

/**
 * Add a zero before the number if number < 10
 * @param {number} number 
 */
function leadingZero(number) {
    if (Number(number) < 10) {
        number = "0" + number;
    }
    return number;
}
exports.leadingZero = (number) => leadingZero(number);

var date = new Date(new Date().toUTCString());
var dd = date.getDate();
var mm = date.getMonth() + 1;
var yyyy = date.getFullYear();
var ss = date.getSeconds();
var min = date.getMinutes();
var hh = date.getHours();
dd = leadingZero(dd);
ss = leadingZero(ss);
min = leadingZero(min);
hh = leadingZero(hh);
mm = leadingZero(mm);
exports.connexionDate = () => {
    var dateString = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss} UTC`;
    return dateString;
};

exports.setConfig = (client, guild) => {
    if (!serverSettings[guild.id]) {
        serverSettings[guild.id] = {
            prefix: config.defaultPrefix,
            language: "english",
            level: "off"
        };

        fs.writeFile("./storage/serverSettings.json", JSON.stringify(serverSettings), (err) => {
            if (err) {
                return logger.newError(client, err, __filename);
            }
        });
    }
};

/**
 * Return the first caracter of the first word to uppercase
 * @param {string} string
 */
exports.capitalizeArg = (string) => {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
};

/**
 * Return the first caracter of every word to uppercase
 * @param {Object} string String or Array
 */
exports.capitalizeSentence = (string) => {
    string.constructor !== Array ? string = string.split(" ") : string;
    for (var i = 0, x = string.length; i < x; i++) {
        string[i] = string[i][0].toUpperCase() + string[i].substr(1);
    }
    return string.join(" ");
};

/**
 * Return the first caracter of the first word to lowercase
 * @param {string} string
 */
exports.lowerArg = (string) => {
    string = string.charAt(0).toLowerCase() + string.slice(1);
    return string;
};

/**
 * Return the first caracter of every word to lowercase
 * @param {Object} string
 */
exports.lowerSentence = (string) => {
    string.constructor !== Array ? string = string.split(" ") : string;
    for (var i = 0, x = string.length; i < x; i++) {
        string[i] = string[i][0].toLowerCase() + string[i].substr(1);
    }
    return string.join(" ");
};

/**
 * Delete a message if the client has permissions
 * @param {Object} message Message to be deleted 
 * @param {number} timeout Timeout for the message to be deleted
 */
exports.del = (message, timeout = 5000) => {
    console.log("GLOBAL.DEL IS DEPRECATED");
    message.delete(timeout).catch(() => {
        return;
    });
};

/**
 * Must be in an await function !
 * @param {Number} ms 
 */
exports.sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve;
        }, ms);
    });
};

/**
 * Return a fahrenheit temperature
 * @param {number} temp Temperature
 * @param {string} unit Base unit (C/K)
 */
exports.fahrenheit = (temp, unit) => {
    var conversion;
    if (unit === "C") {
        conversion = (9 / 5) * (Number(temp)) + 32;
        return conversion;
    } else if (unit === "K") {
        conversion = Number(temp) * (9 / 5) - 459.67;
        return conversion;
    }
};

/**
 * Return a Celsius temperature
 * @param {number} temp Temperature
 * @param {string} unit Base unit (F/K)
 */
exports.celsius = (temp, unit) => {
    var conversion;
    if (unit === "F") {
        conversion = (Number(temp) - 32) * (5 / 9);
        return conversion;
    }
    if (unit === "K") {
        conversion = Number(temp) - 273.15;
    }
    return conversion;
};

/**
 * Return a Kelvin temperature
 * @param {number} temp Temperature
 * @param {string} unit Base unit (C/F)
 */
exports.kelvin = (temp, unit) => {
    var conversion;
    if (unit === "C") {
        conversion = Number(temp) + 273.15;
    }
    if (unit === "F") {
        conversion = (Number(temp) + 459.67) * (5 / 9);
    }
    return conversion;
};

/**
 * Add an invisible space in front of each "@"
 * @param {string} text 
 */
exports.clean = (text) => {
    if (typeof (text) === "string") {
        text = text.replace(/"/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    }
    return text;
};

exports.newDate = () => {
    var date = new Date(new Date().toUTCString());
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var ss = date.getSeconds();
    var min = date.getMinutes();
    var hh = date.getHours();
    dd = leadingZero(dd);
    ss = leadingZero(ss);
    min = leadingZero(min);
    hh = leadingZero(hh);
    mm = leadingZero(mm);
    var dateString = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss} UTC`;
    return dateString;
};


/**
 * Remove spaces
 * @param {string} array 
 */
exports.trim = (array) => {
    for (var i = 0; i < array.length; i++) {
        array[i] = array[i].trim();
    }
    return array;
};


/**
 * Return an emoji
 * @param {Object} client Discord client 
 * @param {Number} emojiId Emoji"s unique id
 */
exports.searchEmoji = (client, emojiId) => {
    var emoji = client.emojis.find((emoji) => emoji.id === emojiId);
    return emoji;
};

/**
 * Split an array into more array
 * @param {Array} array Long array
 * @param {Number} slicer
 */
exports.arrayList = (array, slicer) => {
    var shortArrays = [];
    for (var i = 0, len = array.length; i < len; i += slicer) {
        shortArrays.push(array.slice(i, i + slicer));
    }
    return shortArrays;
};

function play(client, queue, guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        return queue.delete(guild.id);
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
        filter: "audioonly"
    }));
    dispatcher.on("end", () => {
        try {
            if (serverQueue.repeat === true) {
                return play(client, queue, guild, serverQueue.songs[0]);
            } else {
                serverQueue.songs.shift();
                return play(client, queue, guild, serverQueue.songs[0]);
            }
        } catch (error) {
            serverQueue.voiceChannel.leave();
            console.log(error);
            return logger.newError(client, error, __filename);
        }
    });
    dispatcher.on("error", (error) => {
        console.log(error);
        logger.newError(client, error, __filename);
        return serverQueue.textChannel.send(`I had to stop playing music because :\n\`\`\`${error}\`\`\``);
    });
    dispatcher.setVolume(serverQueue.volume / 100);
    const musicPlay = new Discord.RichEmbed()
        .setColor("FF0000")
        .setAuthor("Play", "https://png.icons8.com/play/dusk/50")
        .setTitle("Direct link")
        .setURL(song.url)
        .setImage(`https://i.ytimg.com/vi/${song.id}/maxresdefault.jpg`)
        .addField("Now playing :", song.title, false)
        .setTimestamp();
    return serverQueue.textChannel.send(musicPlay);
}

exports.play = (client, queue, guild, song) => play(client, queue, guild, song);

exports.handleVideo = async (client, queue, video, message, voiceChannel, playlist = false) => {
    const serverQueue = queue.get(message.guild.id);
    var duration = ms(`${video.duration.days}days`) + ms(`${video.duration.hours}hours`) + ms(`${video.duration.minutes}minutes`) + ms(`${video.duration.seconds}seconds`) + ms(`${video.duration.weeks}weeks`) + ms(`${video.duration.years}years`);

    const song = {
        id: video.id,
        title: (video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        duration
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
            play(client, queue, message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.log(error);
            return logger.newError(client, error, __filename);
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) {
            return null;
        } else {
            const musicSongAdd = new Discord.RichEmbed()
                .setColor("FF0000")
                .setAuthor("Play", "https://png.icons8.com/play/dusk/50")
                .setDescription(`\`${song.title}\` added to queue !`);
            return message.channel.send(musicSongAdd);
        }
    }
};
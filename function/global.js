const config = require('../config.js');

var fixheure = config.id === '416534697703636993' ? 0 : config.fixheure;
var date = new Date();
var dd = date.getDate();
var mm = date.getMonth() + 1;
var yyyy = date.getFullYear();
var ss = date.getSeconds();
var min = date.getMinutes();
var hh = date.getHours() + fixheure;
dd < 10 ? dd = '0' + dd : dd;
ss < 10 ? ss = '0' + ss : ss;
min < 10 ? min = '0' + min : min;
hh < 10 ? hh = '0' + hh : hh;
mm < 10 ? mm = '0' + mm : mm;
hh === 24 ? hh = '00' : hh;
exports.connexionDate = () => {
    var dateString = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
    return dateString;
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
    string.constructor !== Array ? string = string.split(' ') : string;
    for (var i = 0, x = string.length; i < x; i++) {
        string[i] = string[i][0].toUpperCase() + string[i].substr(1);
    }
    return string.join(' ');
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
    string.constructor !== Array ? string = string.split(' ') : string;
    for (var i = 0, x = string.length; i < x; i++) {
        string[i] = string[i][0].toLowerCase() + string[i].substr(1);
    }
    return string.join(' ');
};

/**
 * Delete a message if the client has permissions
 * @param {Object} message Message to be deleted 
 * @param {number} timeout Timeout for the message to be deleted
 */
exports.del = (message, timeout) => {
    var deltimeout = timeout ? Number(timeout) : Number(2000);
    var user = message.guild.members.find('id', config.id);
    if (user.hasPermission('MANAGE_MESSAGES')) {
        setTimeout(() => {
            message.delete();
        }, deltimeout);
    } else {

    }
};

/**
 * Return a fahrenheit temperature
 * @param {number} temp Temperature
 * @param {string} unit Base unit (C/K)
 */
exports.fahrenheit = (temp, unit) => {
    var conversion;
    if (unit === 'C') {
        conversion = (9 / 5) * (Number(temp)) + 32;
        return conversion;
    } else if (unit === 'K') {
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
    if (unit === 'F') {
        conversion = (Number(temp) - 32) * (5 / 9);
        return conversion;
    }
    if (unit === 'K') {
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
    if (unit === 'C') {
        conversion = Number(temp) + 273.15;
    }
    if (unit === 'F') {
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
        text = text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    }
    return text;
};

exports.newDate = () => {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var ss = date.getSeconds();
    var min = date.getMinutes();
    var hh = date.getHours() + fixheure;
    dd < 10 ? dd = '0' + dd : dd;
    ss < 10 ? ss = '0' + ss : ss;
    min < 10 ? min = '0' + min : min;
    hh < 10 ? hh = '0' + hh : hh;
    mm < 10 ? mm = '0' + mm : mm;
    hh === 24 ? hh = '00' : hh;
    var dateString = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
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
 * Add a zero before the number if number < 10
 * @param {number} number 
 */
exports.leadingZero = (number) => {
    if (Number(number) < 10) {
        number = '0' + number;
    }
    return number;
};


/**
 * Return an emoji
 * @param {Object} client Discord client 
 * @param {Number} emojiId Emoji's unique id
 */
exports.searchEmoji = (client, emojiId) => {
    var emoji = client.emojis.find('id', emojiId);
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
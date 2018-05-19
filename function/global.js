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
exports.connexionDate = () => {
    var dateString = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
    return dateString;
};

exports.capitalizeArg = (string) => {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
};

exports.capitalizeSentence = (string) => {
    string.constructor !== Array ? string = string.split(' ') : string;
    for (var i = 0, x = string.length; i < x; i++) {
        string[i] = string[i][0].toUpperCase() + string[i].substr(1);
    }
    return string.join(' ');
};

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
    var dateString = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
    return dateString;
};

exports.trim = (array) => {
    for (var i = 0; i < array.length; i++) {
        array[i] = array[i].trim();
    }
    return array;
};

exports.leadingZero = (number) => {
    if (Number(number) < 10) {
        number = '0' + number;
    }
    return number;
};

exports.searchEmoji = (client, emojiId) => {
    var emoji = client.emojis.find('id', emojiId);
    return emoji;
};
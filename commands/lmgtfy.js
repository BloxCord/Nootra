const encode = require('strict-uri-encode');
const config = require('../config.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {
message ? message.delete(2000) : message;
    var question = encode(args.join(' '));
    var link = `https://www.lmgtfy.com/?q=${question}`;
    message.channel.send(`<${link}>`);

};
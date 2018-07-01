const encode = require('strict-uri-encode');
const config = require('../config.js');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    var question = encode(args.join(' '));
    var link = `https://www.lmgtfy.com/?q=${question}`;
    message.channel.send(`<${link}>`);

};
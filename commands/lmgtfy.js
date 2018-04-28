const encode = require('strict-uri-encode');
const config = require('../config.js');
exports.timer = '2seconds';
exports.run = (client, message, args) => {

    let question = encode(args.join(' '));
    let link = `https://www.lmgtfy.com/?q=${question}`;
    message.channel.send(`<${link}>`);

}
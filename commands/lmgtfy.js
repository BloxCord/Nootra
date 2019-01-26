const encode = require('strict-uri-encode');
const global = require('../function/global.js');

module.exports = {
    name: 'lmgtfy',
    description: '',
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: 'fun',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        global.del(message, 5000);
        var question = encode(args.join(' '));
        var link = `https://www.lmgtfy.com/?q=${question}`;
        message.channel.send(`<${link}>`);
    }
};
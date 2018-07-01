const shorten = require('vgd');
const global = require('../function/global.js');

exports.timer = '10seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    
    if (!args[0] || !args[0].startsWith('https://v.gd/')) {
        return message.reply("please input some valid link.");
    }
    shorten.lookup(args[0], (res) => {
        if (res.startsWith('Error:')) {
            return message.channel.send('**This URL isn\'t valid**');
        }
        message.channel.send(`<${res}>`);
    });
};
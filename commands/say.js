const global = require('../function/global.js');

module.exports = {
    name: 'say',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: ['SEND_MESSAGES'],
    type: 'fun',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        global.del(message, 5000);
        message.channel.send(args.join(''));
    }
};
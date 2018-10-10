const ascii = require('ascii-art');
const global = require('../function/global.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {

    global.del(message, 5000);

    try {
        ascii.font(args.join(' '), 'Doom', (rendered) => {
            rendered.trimRight();
    
            if (rendered.length > 1900) {
                return message.reply('Exceeded max characters limit');
            }
            return message.channel.send(rendered, {
                code: 'md'
            });
        });   
    } catch (error) {
        return message.reply(`A character is not valid`);
    }

};
const shorten = require('vgd');
exports.timer = '10seconds';
exports.run = (client, message, args, tools) => {
    if (!args[1]) {
        shorten.shorten(args[0], (res) => {
            if (res.startsWith('Error:')) return message.channel.send("**This URL isn't valid**");
            message.channel.send(`<${res}>`);
            message.delete(2000);
        })
    } else if (args[1]) {
        shorten.custom(args[0], args[1], (res) => {
            if (res.startsWith('Error:')) return message.channel.send(`${res}`);
            message.channel.send(`<${res}>`);
            message.delete(2000);
        })
    } else return message.reply("couldn't shorten this link, sorry")
}
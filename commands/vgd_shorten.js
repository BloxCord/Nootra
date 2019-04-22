const shorten = require("vgd");
const global = require("../function/global.js");

module.exports = {
    name: "shorten",
    description: "",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "utility",
    help: "",
    cooldown: 5,
    execute(client, message, args) {
        
        message.delete(5000).catch(() => {
            return;
        });

        if (!args[1]) {
            shorten.shorten(args[0], (res) => {
                if (res.startsWith("Error:")) {
                    return message.channel.send("**This URL isn't valid**");
                }
                message.channel.send(`<${res}>`);
            });
        } else if (args[1]) {
            shorten.custom(args[0], args[1], (res) => {
                if (res.startsWith("Error:")) {
                    return message.channel.send(`${res}`);
                }
                message.channel.send(`<${res}>`);
            });
        } else {
            return message.reply("couldn't shorten this link, sorry");
        }
    }
};
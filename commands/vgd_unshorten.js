const shorten = require("vgd");
const global = require("../function/global.js");

module.exports = {
    name: "unshorten",
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

        if (!args[0] || !args[0].startsWith("https://v.gd/")) {
            return message.reply("please input some valid link.");
        }
        shorten.lookup(args[0], (res) => {
            if (res.startsWith("Error:")) {
                return message.channel.send("**This URL isn\"t valid**");
            }
            message.channel.send(`<${res}>`);
        });
    }
};
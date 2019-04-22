const encode = require("strict-uri-encode");
const global = require("../function/global.js");

module.exports = {
    name: "lmgtfy",
    description: "",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "fun",
    help: "",
    cooldown: 5,
    execute(client, message, args) {
        
        message.delete(5000).catch(() => {
            return;
        });

        var question = encode(args.join(" "));
        var link = `https://www.lmgtfy.com/?q=${question}`;
        message.channel.send(`<${link}>`);
    }
};
const global = require("../function/global.js");

module.exports = {
    name: "say",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: ["SEND_MESSAGES"],
    type: "fun",
    help: "",
    cooldown: 5,
    execute(client, message, args) {

        message.delete().catch(() => {
            return;
        });

        message.channel.send(args.join(" "));
    }
};
const global = require("../function/global.js");

module.exports = {
    name: "nick",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: ["MANAGE_NICKNAMES"],
    type: "utility",
    help: "",
    cooldown: 5,
    execute(client, message, args) {
        
        message.delete(5000).catch(() => {
            return;
        });
        
        var UserMention = message.mentions.members.first();
        message.guild.members.get(UserMention.id).setNickname(args.join(" ").replace(UserMention, "").trim());
    }
};
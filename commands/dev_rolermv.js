const global = require("../function/global.js");

module.exports = {
    name: "rolermv",
    description: "",
    guildOnly: true,
    devOnly: true,
    perms: [],
    type: "dev",
    help: "prefix + rolermv 'roleName'",
    cooldown: 5,
    execute(client, message, args) {
        
        message.delete().catch(() => {
            return;
        });

        const userMention = message.mentions.members.first() || message.member;
        var role = message.guild.roles.find((role) => role.name === args.join(" "));

        userMention.removeRole(role).catch((err) => console.log(err));
    }
};
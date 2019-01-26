const global = require('../function/global.js');

module.exports = {
    name: 'roleadd',
    description: '',
    guildOnly: true,
    devOnly: true,
    perms: [],
    type: 'dev',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        global.del(message, 5000);
        const user = message.mentions.members.first() || message.member;
        var role = message.guild.roles.find((role) => role.name === args.join(' '));

        try {
            user.addRole(role);
        } catch (error) {
            return;
        }
    }
};
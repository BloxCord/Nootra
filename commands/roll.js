module.exports = {
    name: 'roll',
    description: '',
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: 'fun',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        if (args[0]) {
            var result = Math.floor((Math.random() * args[0]) + 1);
        } else {
            var result = Math.floor((Math.random() * 100) + 1);
        }
        message.reply(`you've made a ${result}`);
    }
};
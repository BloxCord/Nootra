module.exports = {
    name: "roll",
    description: "",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "fun",
    help: "",
    cooldown: 5,
    execute(client, message, args) {
        var result;
        if (args[0]) {
            result = Math.floor((Math.random() * args[0]) + 1);
        } else {
            result = Math.floor((Math.random() * 100) + 1);
        }
        message.reply(`you"ve made a ${result}`);
    }
};
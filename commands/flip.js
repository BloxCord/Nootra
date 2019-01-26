module.exports = {
    name: 'flip',
    description: '',
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: 'fun',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        var channel = message.channel;
        var result = Math.floor((Math.random() * 2) + 1);

        if (result === 1) {
            channel.send("HEAD !");
        } else {
            channel.send("TAIL !");
        }
    }
};
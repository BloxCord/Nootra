module.exports = {
    name: 'quit',
    description: '',
    guildOnly: true,
    devOnly: true,
    perms: [],
    type: 'dev',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        console.log('Déconnexion...');
        process.exit(1000);
    }
};
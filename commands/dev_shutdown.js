module.exports = {
    name: "shutdown",
    description: "",
    guildOnly: false,
    devOnly: true,
    perms: [],
    type: "dev",
    help: "",
    cooldown: 5,
    execute(client, message, args) {
        console.log("Déconnexion...");
        process.exit(1414).catch((err) => console.log(err));
    }
};
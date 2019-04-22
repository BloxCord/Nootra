exports.run = (client) => {
    console.log("DÉCONNEXION..");
    client.login(client.config.token);
};
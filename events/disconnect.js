const config = require("../storage/globalSettings.js");

exports.run = (client) => {
    console.log("DÉCONNEXION..");
    client.login(config.token);
};
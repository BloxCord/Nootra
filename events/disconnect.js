const config = require('../config.js');

exports.run = (client) => {
    console.log('DÉCONNEXION..');
    client.login(config.token);
};
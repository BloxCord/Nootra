const Discord = require("discord.js");
const client = new Discord.Client();
client.config = require("./storage/globalSettings.js").devConfig;
client.login(client.config.token);

require("./server.js").run(client);
const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "help",
    description: "Help Command",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "utility",
    help: "help <commandName>",
    cooldown: 5,
    async execute(client, message, args) {
        let _command = client.commands.find((command) => command.name === args[0]) || "";

        message.delete(5000).catch(() => {
            return;
        });

        // EMBEDS
        var devNames = [];
        var utilityNames = [];
        var musicNames = [];
        var moderationNames = [];
        var funNames = [];
        client.commands.filter((command) => command.type === "dev").forEach((command) => devNames.push(command.name));
        client.commands.filter((command) => command.type === "utility").forEach((command) => utilityNames.push(command.name));
        client.commands.filter((command) => command.type === "music").forEach((command) => musicNames.push(command.name));
        client.commands.filter((command) => command.type === "moderation").forEach((command) => moderationNames.push(command.name));
        client.commands.filter((command) => command.type === "fun").forEach((command) => funNames.push(command.name));

        const firstEmbed = new Discord.RichEmbed()
            .setAuthor("Commands", "https://png.icons8.com/dusk/64/000000/settings.png")
            .setColor("FF0000");
        const utility = new Discord.RichEmbed()
            .setColor("FF0000")
            .setImage("https://i.imgur.com/eEIj082.png")
            .addField("**__Utily Commands :__**", utilityNames.join(" - "), true);
        const music = new Discord.RichEmbed()
            .setColor("FF0000")
            .setImage("https://i.imgur.com/eEIj082.png")
            .addField("**__Music Commands :__**", musicNames.join(" - "), true);
        const moderation = new Discord.RichEmbed()
            .setColor("FF0000")
            .setImage("https://i.imgur.com/eEIj082.png")
            .addField("**__Moderation Commands :__**", moderationNames.join(" - "), true);
        const fun = new Discord.RichEmbed()
            .setColor("FF0000")
            .setImage("https://i.imgur.com/eEIj082.png")
            .addField("**__Funny Commands :__**", funNames.join(" - "), true);
        const dev = new Discord.RichEmbed()
            .setColor("FF0000")
            .setImage("https://i.imgur.com/eEIj082.png")
            .addField("**__Dev Commands__ :**", devNames.join(" - "), true);

        if (!args[0] && _command === "") {
            await message.channel.send(firstEmbed);
            await message.channel.send(utility);
            await message.channel.send(music);
            await message.channel.send(moderation);
            await message.channel.send(fun);
            if (client.config.devs.includes(message.author.id)) {
                await message.channel.send(dev);
            }
        } else if (args[0] && _command === "") {
            return message.reply("command not found");
        } else if (args[0] && _command !== "") {

            const commandHelp = new Discord.RichEmbed()
                .setAuthor(`${_command.name} Command`, "https://png.icons8.com/dusk/64/000000/settings.png")
                .setColor("FF0000")
                .setImage("https://i.imgur.com/eEIj082.png")
                .addField("**__Description :__**", _command.description === "" ? "SoonTM" : _command.description, false)
                .addField("**__Usage :__**", _command.help === "" ? "SoonTM" : _command.help, false);

            await axios.get(`https://nootra.github.io/commands/${_command.doc ? _command.doc : _command.name}`).then((data) => {
                commandHelp.addField("**__Online documentation__ :**", data.client.config.url, false);
            }).catch((error) => {
                commandHelp.addField("**__Online documentation :__**", "Soon™", false);
            });

            await message.channel.send(commandHelp);
        }
    }
};
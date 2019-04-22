const Discord = require("discord.js");

module.exports = {
    name: "spotify",
    description: "",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "fun",
    help: "",
    cooldown: 5,
    execute(client, message, args) {

        message.delete(5000).catch(() => {
            return;
        });

        var user = message.mentions.users.first() || message.author;

        if (user.presence.game.name === "Spotify" && user.presence.game.type === 2) {
            try {
                var trackImg = user.presence.game.assets.largeImageURL;
                var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
                var trackName = user.presence.game.details;
                var trackAlbum = user.presence.game.assets.largeText;
                var trackAuthor = user.presence.game.state;

                const embed = new Discord.RichEmbed()
                    .setAuthor("Spotify track information", "https://cdn.discordapp.com/emojis/484660230576406549.gif")
                    .setColor("FF0000")
                    .setThumbnail(trackImg)
                    .setDescription(`
\`🎼\` __**Track name :**__  \`${trackName}\`
\`📀\` __**Album :**__  \`${trackAlbum}\`
\`🎤\` __**Artist(s) :**__  \`${trackAuthor}\`
`)
                    .addField("Listen to this track :", `${trackUrl}`, false);

                return message.channel.send(embed);

            } catch (error) {
                return message.channel.send(new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setDescription(`**[\`❌\` ERROR]** Track not referenced.`)
                );
            }

        } else {
            return message.channel.send(new Discord.RichEmbed()
                .setColor("FF0000")
                .setDescription(`**[\`❌\` ERROR]** ${user.username} is not listening to spotify.`)
            );
        }
    }
};
const Discord = require("discord.js");
const global = require("../function/global.js");
const config = require("../storage/globalSettings.js");

module.exports = {
    name: "volume",
    description: "",
    guildOnly: true,
    devOnly: false,
    perms: [],
    type: "music",
    help: "",
    cooldown: 5,
    async execute(client, message, args) {
        
        var queue = client.queue;
        var serverQueue = queue.get(message.guild.id);
        var memberRole = message.member.roles;

        message.delete(5000).catch(() => {
            return;
        });

        var volume = serverQueue.volume <= 10 ? "[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬" : serverQueue.volume <= 20 ? "[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬" : serverQueue.volume <= 30 ? "[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬" : serverQueue.volume <= 40 ? "[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬" : serverQueue.volume <= 50 ? "[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬" : serverQueue.volume <= 60 ? "[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬" : serverQueue.volume <= 70 ? "[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬" : serverQueue.volume <= 80 ? "[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬" : serverQueue.volume <= 90 ? "[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬" : "[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)";
        if (config.devs.includes(message.author.id) || memberRole.find((role) => role.name === "DJ")) {
            if (!message.member.voiceChannel) {
                return message.reply("you're not in a vocal channel.");
            }
            if (!serverQueue) {
                return message.reply("nothing's playing.");
            }
            if (!args[0]) {
                const musicVolume = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor("Volume", "https://png.icons8.com/audio/dusk/50")
                    .setDescription(`
Actual volume : **${serverQueue.volume}%**
\`[1%]\` ${volume} \`[100%] 🔊\`
                    `);
                return message.channel.send(musicVolume);
            } else if (args[0] < 1 || args[0] > 100) {
                return message.reply("you don't have access to those values (Authorized values : 1 to 100)");
            } else if (isNaN(args[0])) {
                return message.reply(`"${args[0]}" is not a number.`);
            } else {
                serverQueue.volume = args[0];
                serverQueue.connection.dispatcher.setVolume(args[0] / 100);

                var newvolume = serverQueue.volume <= 10 ? "[▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬▬" : serverQueue.volume <= 20 ? "[▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬▬" : serverQueue.volume <= 30 ? "[▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬▬" : serverQueue.volume <= 40 ? "[▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬▬" : serverQueue.volume <= 50 ? "[▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬▬" : serverQueue.volume <= 60 ? "[▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬▬" : serverQueue.volume <= 70 ? "[▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬▬" : serverQueue.volume <= 80 ? "[▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬▬" : serverQueue.volume <= 90 ? "[▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)▬" : "[▬▬▬▬▬▬▬▬▬▬](http://www.notavone.me/)";

                const musicVolume = new Discord.RichEmbed()
                    .setColor("FF0000")
                    .setAuthor("Volume", "https://png.icons8.com/audio/dusk/50")
                    .setDescription(`
Volume is now set at **${args[0]}%**
\`[1%]\` ${newvolume} \`[100%] 🔊\`
                    `);
                return message.channel.send(musicVolume);
            }

        } else {
            return message.reply("this command is restricted");
        }
    }
};
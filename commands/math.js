const math = require("mathjs");
const Discord = require("discord.js");
const global = require("../function/global.js");

module.exports = {
    name: "math",
    description: "",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "utility",
    help: "",
    cooldown: 5,
    execute(client, message, args) {
        
        message.delete(5000).catch(() => {
            return;
        });

        if (!args[0]) {
            return message.reply("please input some math stuff");
        } else {
                var output = math.eval(args.join(" "));
                const embed = new Discord.RichEmbed()
                    .addField("\`📥\` **Input**", `\`\`\`js\n${args.join(" ")}\`\`\``, false)
                    .addField("\`📤\` **Output**", `\`\`\`js\n${output}\`\`\``)
                    .setColor("FF0000");
                return message.channel.send(embed).catch((err) => {
                    console.log(err);
                    return message.reply("error while processing..");
                });
            
        }
    }
};
const config = require("../storage/globalSettings.js");
const global = require("./global.js");
const Discord = require("discord.js");

/**
 * Send an error message to the specified channel
 * @param {Object} client Discord Client
 * @param {Object} error Generated error by a catch block or a callback
 * @param {__filename} fileName Usefull to know from where the error comes from
 */
exports.newError = (client, error, fileName) => {
    if (error) {
        const channelLoggerError = client.channels.find((channel) => channel.id === "422507483479932928");
        if (fileName) console.log(fileName);
        console.log(error);
        return channelLoggerError.send(`
- Date :
${global.newDate()}
- Version (bot) <logger>
(${config.version}) <${config.loggerVersion}>
- Error :
${error.toString()}`, {
            code: "diff"
        });
    }
};

exports.messageSent = (client, message) => {
    const channelLoggerMsg = client.channels.find((channel) => channel.id === config.loggerMsgId);

    if (message.content.length > 700) {
        return;
    }

    message.attachments.map((attach) => {

        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setDescription(`
\`\`\`diff
- Pseudo (ID):
${message.author.username} (${message.author.id})
- Serveur (ID):
${message.channel.type === "text" ? message.guild.name : ""} (${message.channel.type === "text" ? message.guild.name : `#${message.author.tag}`})
- Date :
${global.newDate()}
- Version (bot) <logger>
(${config.version}) <${config.loggerVersion}>
- Message :
${message.content}
\`\`\``);
        attach.url !== "" ? embed.setImage(attach.url) : null;

        channelLoggerMsg.send(embed);
    });
};

exports.newTodo = (client, message, args) => {
    const channelLoggerTodo = client.channels.find((channel) => channel.id === "427552722401886209");
    channelLoggerTodo.send(`
- Date :
${global.newDate()}
- Version (bot) <logger>
(${config.version}) <${config.loggerVersion}>
- To-do :
${args.join(" ")}
- Pseudo (ID) :
${message.author.username} (${message.author.id})`, {
        code: "diff"
    });
};

exports.bugReport = (client, message, report) => {
    const channelLoggerBug = client.channels.find((channel) => channel.id === "444781160162394112");
    channelLoggerBug.send(report).then((msg) => {
        msg.edit(msg.content + `\n**Report ID :** ${msg.id}`);
        message.author.send(new Discord.RichEmbed().setColor("FF0000").setDescription(`
Hello, thank you for submitting a report, moderators are going to inspect it soon.
Report id : **${msg.id}**`));
    });
};

exports.guildCreate = (client, guild) => {
    const channelLoggerGuild = client.channels.find((channel) => channel.id === "422507423815958549");
    channelLoggerGuild.send(new Discord.RichEmbed()
        .setColor("FF0000")
        .setThumbnail(guild.iconURL)
        .setAuthor("[guildCreate]", "https://cdn.discordapp.com/emojis/435603381818490880.png")
        .setDescription(`
\`\`\`diff
- Serveur (ID) :
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <logger>
(${config.version}) <${config.loggerVersion}>
\`\`\``)
    );
};

exports.guildDelete = (client, guild) => {
    const channelLoggerGuild = client.channels.find((channel) => channel.id === "422507423815958549");
    channelLoggerGuild.send(new Discord.RichEmbed()
        .setColor("FF0000")
        .setThumbnail(guild.iconURL)
        .setAuthor("[guildDelete]", "https://cdn.discordapp.com/emojis/435603381269037057.png")
        .setDescription(`
\`\`\`diff
- Serveur (ID) :
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <logger>
(${config.version}) <${config.loggerVersion}>
\`\`\``)
    );
};

exports.memberAdd = async (client, member) => {
    const channelLoggerGuild = client.channels.find((channel) => channel.id === "422507423815958549");
    channelLoggerGuild.send(new Discord.RichEmbed()
        .setColor("FF0000")
        .setThumbnail(member.user.avatarURL)
        .setAuthor("[guildMemberAdd]", "https://cdn.discordapp.com/emojis/435603381818490880.png")
        .setDescription(`
\`\`\`diff
- Member (ID) :
${member.user.username} (${member.user.id})
- Guild (ID) :
${member.guild.name} (${member.guild.id})
- Date :
${global.newDate()}
- Version (bot) <logger>
(${config.version}) <${config.loggerVersion}>
\`\`\``)
    );
};

exports.memberRemove = (client, member) => {
    const channelLoggerGuild = client.channels.find((channel) => channel.id === "422507423815958549");
    channelLoggerGuild.send(new Discord.RichEmbed()
        .setColor("FF0000")
        .setThumbnail(member.user.avatarURL)
        .setAuthor("[guildMemberRemove]", "https://cdn.discordapp.com/emojis/435603381269037057.png")
        .setDescription(`
\`\`\`diff
- Member (ID) :
${member.user.username} (${member.user.id})
- Guild (ID) :
${member.guild.name} (${member.guild.id})
- Date :
${global.newDate()}
- Version (bot) <logger>
(${config.version}) <${config.loggerVersion}>
\`\`\``)
    );
};
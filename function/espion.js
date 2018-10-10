const config = require('../storage/globalSettings.js');
const global = require('./global.js');
const Discord = require('discord.js');

/**
 * Send an error message to the specified channel
 * @param {Object} client Discord Client
 * @param {Object} error Generated error by a catch block or a callback
 * @param {__filename} fileName Usefull to know from where the error comes from
 */
exports.newError = (client, error, fileName) => {
    const channelEspionError = client.channels.find((channel) => channel.id === '422507483479932928');
    if(fileName) console.log(fileName);
    console.log(error.toString());
    return channelEspionError.send(`
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espionVersion}>
- Error :
${error.toString()}`, {
        code: 'diff'
    });
};

exports.messageSent = (client, message) => {
    const channelEspionMsg = client.channels.find((channel) => channel.id === config.espionMsgId);

    if (message.content.length > 700) {
        return;
    }

    if (message.attachments.size > 0) {
        message.attachments.map((attach) => {
            channelEspionMsg.send(new Discord.RichEmbed()
                .setColor('FF0000')
                .setImage(attach.url)
                .setDescription(`
\`\`\`diff
- Pseudo (ID):
${message.author.username} (${message.author.id})
- Serveur (ID):
${message.guild.name} (${message.guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espionVersion}>
- Message :
${message.content}
\`\`\``));
        });
    } else {
        return channelEspionMsg.send(new Discord.RichEmbed()
            .setColor('FF0000')
            .setDescription(`
\`\`\`diff
- Pseudo (ID):
${message.author.username} (${message.author.id})
- Serveur (ID):
${message.guild.name} (${message.guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espionVersion}>
- Message :
${message.content}
\`\`\``));
    }
};

exports.newTodo = (client, message, args) => {
    const channelEspionTodo = client.channels.find((channel) => channel.id === '427552722401886209');
    channelEspionTodo.send(`
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espionVersion}>
- To-do :
${args.join(' ')}
- Pseudo (ID) :
${message.author.username} (${message.author.id})`, {
        code: 'diff'
    });
};

exports.bugReport = (client, message, report) => {
    const channelEspionBug = client.channels.find((channel) => channel.id === '444781160162394112');
    channelEspionBug.send(report).then((msg) => {
        msg.edit(msg.content + `\n**Report ID :** ${msg.id}`);
        message.author.send(new Discord.RichEmbed().setColor('FF0000').setDescription(`
Hello, thank you for submitting a report, moderators are going to inspect it soon.
Report id : **${msg.id}**`));
    });
};

exports.guildCreate = (client, guild) => {
    const channelEspionGuild = client.channels.find((channel) => channel.id === '422507423815958549');
    channelEspionGuild.send(new Discord.RichEmbed()
        .setColor('FF0000')
        .setThumbnail(guild.iconURL)
        .setAuthor("[guildCreate]", "https://cdn.discordapp.com/emojis/435603381818490880.png")
        .setDescription(`
\`\`\`diff
- Serveur (ID) :
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espionVersion}>
\`\`\``)
    );
};

exports.guildDelete = (client, guild) => {
    const channelEspionGuild = client.channels.find((channel) => channel.id === '422507423815958549');
    channelEspionGuild.send(new Discord.RichEmbed()
        .setColor('FF0000')
        .setThumbnail(guild.iconURL)
        .setAuthor("[guildDelete]", "https://cdn.discordapp.com/emojis/435603381269037057.png")
        .setDescription(`
\`\`\`diff
- Serveur (ID) :
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espionVersion}>
\`\`\``)
    );
};

exports.memberAdd = (client, member, guild) => {
    const channelEspionGuild = client.channels.find((channel) => channel.id === '422507423815958549');
    channelEspionGuild.send(new Discord.RichEmbed()
        .setColor('FF0000')
        .setThumbnail(member.user.avatarURL)
        .setAuthor("[guildMemberAdd]", "https://cdn.discordapp.com/emojis/435603381818490880.png")
        .setDescription(`
\`\`\`diff
- Member (ID) :
${member.user.username} (${member.user.id})
- Serveur (ID) :
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espionVersion}>
\`\`\``)
    );
};

exports.memberRemove = (client, member, guild) => {
    const channelEspionGuild = client.channels.find((channel) => channel.id === '422507423815958549');
    channelEspionGuild.send(new Discord.RichEmbed()
        .setColor('FF0000')
        .setThumbnail(member.user.avatarURL)
        .setAuthor("[guildMemberRemove]", "https://cdn.discordapp.com/emojis/435603381269037057.png")
        .setDescription(`
\`\`\`diff
- Member (ID) :
${member.user.username} (${member.user.id})
- Serveur (ID) :
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espionVersion}>
\`\`\``)
    );
};
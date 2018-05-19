const config = require('../config.js');
const global = require('./global.js');
const Discord = require('discord.js');

/* eslint-disable camelcase, capitalized-comments */

exports.new_error = (client, error) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionError = GuildEspion.channels.find('id', '422507483479932928');
    if (error) {
        console.log(error);
        return ChannelEspionError.send(`
\`\`\`diff
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
- Error :
${error}
\`\`\``);
    } else {
        return;
    }
};

exports.message_sent = (client, message) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionMsg = GuildEspion.channels.find('id', config.espion_msg_id);
    ChannelEspionMsg.send(`
\`\`\`diff
- Pseudo (ID):
${message.author.username} (${message.author.id})
- Serveur (ID):
${message.guild.name} (${message.guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
- Message :
${message.content}
\`\`\``);
};

exports.new_todo = (client, message, args) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionTodo = GuildEspion.channels.find('id', '427552722401886209');
    ChannelEspionTodo.send(`
\`\`\`diff
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
- To-do :
${args.join(' ')}
- Pseudo (ID) :
${message.author.username} (${message.author.id})
\`\`\``);
};

exports.bug_report = (client, report) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionBug = GuildEspion.channels.find('id', '444781160162394112');
    ChannelEspionBug.send(report).then((msg) => {
        var id = `\n**Report ID :** ${msg.id}`;
        msg.edit(msg.content + id);
    });
};

exports.guild_create = (client, guild) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionGuild = GuildEspion.channels.find('id', '422507423815958549');
    ChannelEspionGuild.send(`
\`\`\`diff
+ [JOINED]
Serveur (ID):
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
\`\`\``);
};

exports.guild_delete = (client, guild) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionGuild = GuildEspion.channels.find('id', '422507423815958549');
    ChannelEspionGuild.send(`
\`\`\`diff
+ [LEAVED]
Serveur (ID):
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
\`\`\``);
};

exports.member_add = (client, member, guild) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionGuild = GuildEspion.channels.find('id', '422507423815958549');
    if (member.user.bot !== true) {
        ChannelEspionGuild.send(`
\`\`\`diff
- [INFO]
${member.user.username} (${member.user.id}) a rejoins ${member.guild.name} (${member.guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
\`\`\``);
    }
};

exports.member_remove = (client, member, guild) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionGuild = GuildEspion.channels.find('id', '422507423815958549');
    if (member.user.bot !== true) {
        ChannelEspionGuild.send(`
\`\`\`diff
- [INFO]
${member.user.username} (${member.user.id}) a quitté ${member.guild.name} (${member.guild.id})
- Date :\n${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
\`\`\``);
    }
};
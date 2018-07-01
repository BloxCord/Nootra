const config = require('../config.js');
const global = require('./global.js');
const Discord = require('discord.js');

/* eslint-disable camelcase, capitalized-comments */

/**
 * Send an error message to the specified channel
 * @param {Object} client Discord Client
 * @param {Object} error Generated error by a catch block or a callback
 */
exports.new_error = (client, error) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionError = GuildEspion.channels.find('id', '422507483479932928');
    if (error) {
        console.log(error.toString());
        return ChannelEspionError.send(`
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
- Error :
${error.toString()}`, {
            code: 'diff'
        });
    } else {
        return;
    }
};

exports.message_sent = (client, message) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionMsg = GuildEspion.channels.find('id', config.espion_msg_id);
    ChannelEspionMsg.send(`
- Pseudo (ID):
${message.author.username} (${message.author.id})
- Serveur (ID):
${message.guild.name} (${message.guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
- Message :
${message.content}`, {
        code: 'diff'
    });
};

exports.new_todo = (client, message, args) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionTodo = GuildEspion.channels.find('id', '427552722401886209');
    ChannelEspionTodo.send(`
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>
- To-do :
${args.join(' ')}
- Pseudo (ID) :
${message.author.username} (${message.author.id})`, {
        code: 'diff'
    });
};

exports.bug_report = (client, message, report) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionBug = GuildEspion.channels.find('id', '444781160162394112');
    ChannelEspionBug.send(report).then((msg) => {
        msg.edit(msg.content + `\n**Report ID :** ${msg.id}`);
        message.author.send(new Discord.RichEmbed().setColor('FF0000').setDescription(`
Hello, thank you for submitting a report, moderators are going to inspect it soon.
Report id : **${msg.id}**`));
    });
};

exports.guild_create = (client, guild) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionGuild = GuildEspion.channels.find('id', '422507423815958549');
    ChannelEspionGuild.send(`
+ [JOINED]
Serveur (ID):
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>`, {
        code: 'diff'
    });
};

exports.guild_delete = (client, guild) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionGuild = GuildEspion.channels.find('id', '422507423815958549');
    ChannelEspionGuild.send(`
+ [LEAVED]
Serveur (ID):
${guild.name} (${guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>`, {
        code: 'diff'
    });
};

exports.member_add = (client, member, guild) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionGuild = GuildEspion.channels.find('id', '422507423815958549');
    if (member.user.bot !== true) {
        ChannelEspionGuild.send(`
- [INFO]
${member.user.username} (${member.user.id}) a rejoins ${member.guild.name} (${member.guild.id})
- Date :
${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>`, {
            code: 'diff'
        });
    }
};

exports.member_remove = (client, member, guild) => {
    const GuildEspion = client.guilds.find('id', '416532107939151872');
    const ChannelEspionGuild = GuildEspion.channels.find('id', '422507423815958549');
    if (member.user.bot !== true) {
        ChannelEspionGuild.send(`
- [INFO]
${member.user.username} (${member.user.id}) a quitté ${member.guild.name} (${member.guild.id})
- Date :\n${global.newDate()}
- Version (bot) <espion>
(${config.version}) <${config.espion_version}>`, {
            code: 'diff'
        });
    }
};
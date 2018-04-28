const config = require('../config.js')
const discord = require('discord.js')

exports.new_error = (client, error) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;


    const guild_espion = client.guilds.find('id', '416532107939151872');
    const channel_espion_error = guild_espion.channels.find('id', '422507483479932928');
    channel_espion_error.send(`\`\`\`diff\n- Date :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\n- Error :\n${error}\`\`\``)
}

exports.message_sent = (client, message) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;

    const guild_espion = client.guilds.find('id', '416532107939151872');
    const channel_espion_msg = guild_espion.channels.find('id', config.espion_msg_id);
    channel_espion_msg.send(`\`\`\`diff\n- Pseudo (ID):\n${message.author.username} (${message.author.id})\n- Serveur (ID):\n${message.guild.name} (${message.guild.id})\n- Date :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\n- Message :\n${message.content}\`\`\``)
}

exports.new_todo = (client, message, args) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;

    const guild_espion = client.guilds.find('id', '416532107939151872');
    const espion_channel_todo = guild_espion.channels.find('id', '427552722401886209');
    espion_channel_todo.send(`\`\`\`diff\n- Date :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\n- To-do :\n${args.join(' ')}\n- Pseudo (ID) :\n${message.author.username} (${message.author.id})\`\`\``)
}

exports.bug_report = (client, message, args) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;

    const guild_espion = client.guilds.find('id', '416532107939151872');
    const espion_channel_bug = guild_espion.channels.find('id', '426684475569864726');
    espion_channel_bug.send(`\`\`\`diff\n- Date :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\n- BUG REPORT :\n${args.join(' ')}\n- Pseudo (ID) :\n${message.author.username} (${message.author.id})\`\`\``)
}

exports.new_mp = (client, message, contentwtm, usermention) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;

    const guild_espion = client.guilds.find('id', '416532107939151872');
    const espion_channel_mp = guild_espion.channels.find('id', '426434441653518336');
    espion_channel_mp.send(`\`\`\`diff\n-DE :\n ${message.author.username}\n- À :\n${usermention.user.username}\n- MESSAGE :\n${contentwtm}\n- DATE :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\`\`\``)
}

exports.guild_create = (client, guild) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;

    const guild_espion = client.guilds.find('id', '416532107939151872');
    const channel_espion_guild = guild_espion.channels.find('id', '422507423815958549');
    channel_espion_guild.send(`\`\`\`diff\n![JOINED]\nServeur (ID):\n${guild.name} (${guild.id})\n- Date :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\`\`\``)
}

exports.guild_delete = (client, guild) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;

    const guild_espion = client.guilds.find('id', '416532107939151872');
    const channel_espion_guild = guild_espion.channels.find('id', '422507423815958549');
    channel_espion_guild.send(`\`\`\`diff\n![LEAVED]\nServeur (ID):\n${guild.name} (${guild.id})\n- Date :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\`\`\``)
}

exports.member_add = (client, member, guild) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;

    const guild_espion = client.guilds.find('id', '416532107939151872');
    const channel_espion_guild = guild_espion.channels.find('id', '422507423815958549');
    channel_espion_guild.send(`\`\`\`diff\n- [INFO]\n${member.user.username} (${member.user.id}) a rejoins ${member.guild.name} (${member.guild.id})\n- Date :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\`\`\``)
}

exports.member_remove = (client, member, guild) => {
    // Fixheure
    if (config.id !== 416534697703636993) fixheure = config.fixheure
    else fixheure = 0
    // Date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours() + fixheure;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    if (heure < 10) heure = '0' + heure;

    const guild_espion = client.guilds.find('id', '416532107939151872');
    const channel_espion_guild = guild_espion.channels.find('id', '422507423815958549');
    channel_espion_guild.send(`\`\`\`diff\n- [INFO]\n${member.user.username} (${member.user.id}) a quitté ${member.guild.name} (${member.guild.id})\n- Date :\n${dd}/${mm}/${yyyy} => ${heure}h${minute}\n- Version (bot) <espion>\n(${config.version}) <${config.espion_version}>\`\`\``)
}
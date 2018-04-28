const Discord = require('discord.js');
const config = require('../config.js');
exports.timer = '2seconds';
exports.run = (client, message, args) => {

    let msg = message.content;
    let channel = message.channel;
    let author = message.author;
    let question = args.join(' ');
    let replies = ['Yes.', 'No.', 'It\'s possible.', 'It\'s impossible.', 'I don\'t know.', 'Ask later.', 'DIDN\'T READ.', 'WHO R U?', 'Not saying antything. 😶', 'LEAVE ME ALONE!', "It\'s a secret. 🤐", "Shhhh 🤐", "Maybe 😏", "No speak english.", "42.", "Good question.. I don't know"]
    let result = Math.floor((Math.random() * replies.length));

    const ball_embed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setThumbnail('https://png.icons8.com/ask_question/office/100')
        .addField('Question :', question, false)
        .addField('Response :', replies[result], false)
    channel.send(ball_embed);
    message.delete(2000);
}
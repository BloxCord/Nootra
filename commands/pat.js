const Discord = require('discord.js');
const global = require('../function/global.js');

exports.timer = '20seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    
    var images = [
        'https://media1.tenor.com/images/116fe7ede5b7976920fac3bf8067d42b/tenor.gif',
        'https://media1.tenor.com/images/183ff4514cbe90609e3f286adaa3d0b4/tenor.gif?itemid=5518321',
        'https://media1.tenor.com/images/f79a9ec48bde0e592e55447b17ecfbad/tenor.gif?itemid=8053566',
        'https://media1.tenor.com/images/f5176d4c5cbb776e85af5dcc5eea59be/tenor.gif?itemid=5081286',
        'https://media1.tenor.com/images/291ea37382e1d6cd33349c50a398b6b9/tenor.gif?itemid=10204936',
        'https://media1.tenor.com/images/d9b480bcd392d05426ae6150e986bbf0/tenor.gif?itemid=9332926',
        'https://media1.tenor.com/images/bf646b7164b76efe82502993ee530c78/tenor.gif?itemid=7394758',
        'https://media1.tenor.com/images/54722063c802bac30d928db3bf3cc3b4/tenor.gif?itemid=8841561',
        'https://media1.tenor.com/images/c0bcaeaa785a6bdf1fae82ecac65d0cc/tenor.gif?itemid=7453915',
        'https://media1.tenor.com/images/266e5f9bcb3f3aa87ba39526ee202476/tenor.gif?itemid=5518317',
        'https://media1.tenor.com/images/2d0a6b91922250718f260d22c02797fa/tenor.gif?itemid=8262225',
        'https://media1.tenor.com/images/220babfd5f8b629cc16399497ed9dd96/tenor.gif?itemid=6130861',
        'https://media1.tenor.com/images/9fa1e50a657ea2ece043de6e0e93ac8e/tenor.gif?itemid=10361558',
        'https://media1.tenor.com/images/68d981347bf6ee8c7d6b78f8a7fe3ccb/tenor.gif?itemid=5155410',
        'https://media1.tenor.com/images/57c27b395ee2234e05c2113da21535fc/tenor.gif?itemid=10902954',
        'https://media1.tenor.com/images/398c9c832335a13be124914c23e88fdf/tenor.gif?itemid=9939761',
        'https://media1.tenor.com/images/68d981347bf6ee8c7d6b78f8a7fe3ccb/tenor.gif?itemid=5155410',
        'https://data.whicdn.com/images/297125682/original.gif',
        'https://archive-media-0.nyafuu.org/c/image/1483/55/1483553008493.gif',
        'https://i.imgur.com/TPqMPka.gif',
        'https://i.pinimg.com/originals/8b/42/6c/8b426c9bedc37054cd7e73925fa10da5.gif',
        'https://media.giphy.com/media/pEZ1acWgK55jq/giphy.gif',
        'https://media0.giphy.com/media/ye7OTQgwmVuVy/giphy.gif',
        'https://media.giphy.com/media/wUArrd4mE3pyU/giphy.gif'
    ];
    var rand = Math.floor(Math.random() * images.length);
    var randomImage = images[rand];
    var user = message.mentions.members.first();

    if (!args[0] || user.id === message.author.id) {
        const sadEmb = new Discord.RichEmbed()
            .setColor('FF0000')
            .setDescription(`You can't pat yourself :C`)
            .setImage('https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif');
        return message.channel.send(sadEmb);
    } else if (!message.mentions.users.first()) {
        return message.reply(`please mention someone to pat :3`);
    } else {
        const patEmb = new Discord.RichEmbed()
            .setColor('FF0000')
            .setDescription(`<@${message.author.id}> pat ${args[0]} :3`)
            .setImage(randomImage);
        return message.channel.send(patEmb);
    }

};
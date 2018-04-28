const Discord = require('discord.js');
const config = require('../config.js');
const weather = require('weather-js');

exports.timer = '40seconds'
exports.run = (client, message, args) => {
    if(!args[0]) return message.reply('please specify a city')
    weather.find({
        search: args.join(' '),
        degreeType: 'C'
    }, (error, result) => {
        if(result.length === 0) return message.reply('please use a valid location.')

        let current = result[0].current;
        let location = result[0].location;
        let emoji_temp = ''
        if (current.temperature <= 0 && (9/5)*(Number(current.temperature)) <= 32) emoji_temp = '<:tempfreeze:436785452851265536>'
        if (current.temperature > 0 && (9/5)*(Number(current.temperature)) + 32 > 32) emoji_temp = '<:temphot:436785459960610826>'

        const embed = new Discord.RichEmbed()
            .setDescription(`Sky is **${current.skytext}**`)
            .setAuthor(`Weather for ${location.name}`, current.imageUrl)
            .setColor('FF0000')
            .addField(`Temperature ${emoji_temp}`, `${current.temperature}°C / ${Math.round((9/5)*(Number(current.temperature))) + 32}°F`, false)
            if (current.temperature !== current.feelslike) embed.addField(`Feels like ${emoji_temp}`, `${current.feelslike}°C / ${Math.round((9 / 5) * (Number(current.feelslike))) + 32}°F`, false)
            embed.addField('Winds <:wind:436785470836572170>', current.winddisplay, false)
            embed.addField('Humidity <:humidity:436785438833901569>', `${current.humidity}%`, false)
            embed.setTimestamp()
            message.channel.send(embed)
    }
)
}
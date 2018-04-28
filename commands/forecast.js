const Discord = require('discord.js');
const config = require('../config.js');
const weather = require('weather-js');

exports.timer = '40seconds'
exports.run = (client, message, args) => {
    if (!args[0]) return message.reply('please specify a city')
    weather.find({
        search: args.join(' '),
        degreeType: 'C'
    }, (error, result) => {
        if (result.length === 0) return message.reply('please use a valid location.')

        let forecast = result[0].forecast;
        let location = result[0].location;


        let high_emoji_temp0 = ''
        let low_emoji_temp0 = ''
        let high_emoji_temp1 = ''
        let low_emoji_temp1 = ''
        let high_emoji_temp2 = ''
        let low_emoji_temp2 = ''
        let high_emoji_temp3 = ''
        let low_emoji_temp3 = ''
        let high_emoji_temp4 = ''
        let low_emoji_temp4 = ''

        if (forecast[0].high <= 0 && (9 / 5) * (Number(forecast[0].high)) <= 32) high_emoji_temp0 = '<:tempfreeze:436785452851265536>'
        if (forecast[0].high > 0 && (9 / 5) * (Number(forecast[0].high)) + 32 > 32) high_emoji_temp0 = '<:temphot:436785459960610826>'
        if (forecast[0].low <= 0 && (9 / 5) * (Number(forecast[0].low)) <= 32) low_emoji_temp0 = '<:tempfreeze:436785452851265536>'
        if (forecast[0].low > 0 && (9 / 5) * (Number(forecast[0].low)) + 32 > 32) low_emoji_temp0 = '<:temphot:436785459960610826>'

        if (forecast[1].high <= 0 && (9 / 5) * (Number(forecast[1].high)) <= 32) high_emoji_temp1 = '<:tempfreeze:436785452851265536>'
        if (forecast[1].high > 0 && (9 / 5) * (Number(forecast[1].high)) + 32 > 32) high_emoji_temp1 = '<:temphot:436785459960610826>'
        if (forecast[1].low <= 0 && (9 / 5) * (Number(forecast[1].low)) <= 32) low_emoji_temp1 = '<:tempfreeze:436785452851265536>'
        if (forecast[1].low > 0 && (9 / 5) * (Number(forecast[1].low)) + 32 > 32) low_emoji_temp1 = '<:temphot:436785459960610826>'

        if (forecast[2].high <= 0 && (9 / 5) * (Number(forecast[2].high)) <= 32) high_emoji_temp2 = '<:tempfreeze:436785452851265536>'
        if (forecast[2].high > 0 && (9 / 5) * (Number(forecast[2].high)) + 32 > 32) high_emoji_temp2 = '<:temphot:436785459960610826>'
        if (forecast[2].low <= 0 && (9 / 5) * (Number(forecast[2].low)) <= 32) low_emoji_temp2 = '<:tempfreeze:436785452851265536>'
        if (forecast[2].low > 0 && (9 / 5) * (Number(forecast[2].low)) + 32 > 32) low_emoji_temp2 = '<:temphot:436785459960610826>'

        if (forecast[3].high <= 0 && (9 / 5) * (Number(forecast[3].high)) <= 32) high_emoji_temp3 = '<:tempfreeze:436785452851265536>'
        if (forecast[3].high > 0 && (9 / 5) * (Number(forecast[3].high)) + 32 > 32) high_emoji_temp3 = '<:temphot:436785459960610826>'
        if (forecast[3].low <= 0 && (9 / 5) * (Number(forecast[3].low)) <= 32) low_emoji_temp3 = '<:tempfreeze:436785452851265536>'
        if (forecast[3].low > 0 && (9 / 5) * (Number(forecast[3].low)) + 32 > 32) low_emoji_temp3 = '<:temphot:436785459960610826>'

        if (forecast[4].high <= 0 && (9 / 5) * (Number(forecast[4].high)) <= 32) high_emoji_temp4 = '<:tempfreeze:436785452851265536>'
        if (forecast[4].high > 0 && (9 / 5) * (Number(forecast[4].high)) + 32 > 32) high_emoji_temp4 = '<:temphot:436785459960610826>'
        if (forecast[4].low <= 0 && (9 / 5) * (Number(forecast[4].low)) <= 32) low_emoji_temp4 = '<:tempfreeze:436785452851265536>'
        if (forecast[4].low > 0 && (9 / 5) * (Number(forecast[4].low)) + 32 > 32) low_emoji_temp4 = '<:temphot:436785459960610826>'

        const embed = new Discord.RichEmbed()
            .setAuthor(`Weather forecast for ${location.name}`, 'https://cdn.discordapp.com/attachments/418723354963476500/436794552746246144/wheater.png')
            .setColor('FF0000')
            .addField(`${forecast[0].day} ${forecast[0].date}`, `
${high_emoji_temp0} Highest temp : ${forecast[0].high}°C / ${Math.round(Number((5 / 9) * forecast[0].high + 32))}°F
${low_emoji_temp0} Lowest temp : ${forecast[0].low}°C / ${Math.round(Number((5 / 9) * forecast[0].low + 32))}°F
Sky will be : ${forecast[0].skytextday}
`)
            .addField(`${forecast[1].day} ${forecast[1].date}`, `
${high_emoji_temp1} Highest temp : ${forecast[1].high}°C / ${Math.round(Number((5 / 9) * forecast[1].high + 32))}°F
${low_emoji_temp1} Lowest temp : ${forecast[1].low}°C / ${Math.round(Number((5 / 9) * forecast[1].low + 32))}°F
Sky will be : ${forecast[1].skytextday}
`)
            .addField(`${forecast[2].day} ${forecast[2].date}`, `
${high_emoji_temp2} Highest temp : ${forecast[2].high}°C / ${Math.round(Number((5 / 9) * forecast[2].high + 32))}°F
${low_emoji_temp2} Lowest temp : ${forecast[2].low}°C / ${Math.round(Number((5 / 9) * forecast[2].low + 32))}°F
Sky will be : ${forecast[2].skytextday}
`)
            .addField(`${forecast[3].day} ${forecast[3].date}`, `
${high_emoji_temp3} Highest temp : ${forecast[3].high}°C / ${Math.round(Number((5 / 9) * forecast[3].high + 32))}°F
${low_emoji_temp2} Lowest temp : ${forecast[3].low}°C / ${Math.round(Number((5 / 9) * forecast[3].low + 32))}°F
Sky will be : ${forecast[3].skytextday}
`)
            .addField(`${forecast[4].day} ${forecast[4].date}`, `
${high_emoji_temp4} Highest temp : ${forecast[4].high}°C / ${Math.round(Number((5 / 9) * forecast[4].high + 32))}°F
${low_emoji_temp4} Lowest temp : ${forecast[4].low}°C / ${Math.round(Number((5 / 9) * forecast[4].low + 32))}°F
Sky will be : ${forecast[4].skytextday}
`)
        message.channel.send(embed)
    })
}
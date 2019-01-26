const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const weather = require('weather-js');
const global = require('../function/global.js');

module.exports = {
    name: 'forecast',
    description: '',
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: 'fun',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        global.del(message, 5000);

        if (!args[0]) {
            return message.reply('please specify a city');
        }
        weather.find({
            search: args.join(' '),
            degreeType: 'C'
        }, (error, result) => {
            if (result.length === 0) {
                return message.reply('please use a valid location.');
            }

            var forecast = result[0].forecast;
            var location = result[0].location;


            var HighEmojiTemp0 = (forecast[0].high <= 0) ? HighEmojiTemp0 = '<:tempfreeze:436785452851265536>' : HighEmojiTemp0 = '<:temphot:436785459960610826>';
            var LowEmojiTemp0 = (forecast[0].low <= 0) ? LowEmojiTemp0 = '<:tempfreeze:436785452851265536>' : LowEmojiTemp0 = '<:temphot:436785459960610826>';
            var HighEmojiTemp1 = (forecast[1].high <= 0) ? HighEmojiTemp1 = '<:tempfreeze:436785452851265536>' : HighEmojiTemp1 = '<:temphot:436785459960610826>';
            var LowEmojiTemp1 = (forecast[1].low <= 0) ? LowEmojiTemp1 = '<:tempfreeze:436785452851265536>' : LowEmojiTemp1 = '<:temphot:436785459960610826>';
            var HighEmojiTemp2 = (forecast[2].high <= 0) ? HighEmojiTemp2 = '<:tempfreeze:436785452851265536>' : HighEmojiTemp2 = '<:temphot:436785459960610826>';
            var LowEmojiTemp2 = (forecast[2].low <= 0) ? LowEmojiTemp2 = '<:tempfreeze:436785452851265536>' : LowEmojiTemp2 = '<:temphot:436785459960610826>';
            var HighEmojiTemp3 = (forecast[3].high <= 0) ? HighEmojiTemp3 = '<:tempfreeze:436785452851265536>' : HighEmojiTemp3 = '<:temphot:436785459960610826>';
            var LowEmojiTemp3 = (forecast[3].low <= 0) ? LowEmojiTemp3 = '<:tempfreeze:436785452851265536>' : LowEmojiTemp3 = '<:temphot:436785459960610826>';
            var HighEmojiTemp4 = (forecast[4].high <= 0) ? HighEmojiTemp4 = '<:tempfreeze:436785452851265536>' : HighEmojiTemp4 = '<:temphot:436785459960610826>';
            var LowEmojiTemp4 = (forecast[4].low <= 0) ? LowEmojiTemp4 = '<:tempfreeze:436785452851265536>' : LowEmojiTemp4 = '<:temphot:436785459960610826>';

            var HighEmojis = [HighEmojiTemp0, HighEmojiTemp1, HighEmojiTemp2, HighEmojiTemp3, HighEmojiTemp4];
            var LowEmojis = [LowEmojiTemp0, LowEmojiTemp1, LowEmojiTemp2, LowEmojiTemp3, LowEmojiTemp4];

            function cast(day) {
                return `${HighEmojis[day]} Highest temp: ${forecast[day].high}°C / ${Math.round(global.fahrenheit(forecast[day].high, 'C'))}°F\n${LowEmojis[day]} Lowest temp: ${forecast[day].low}°C / ${Math.round(global.fahrenheit(forecast[day].low, 'C'))}°F\nSky : ${forecast[day].skytextday}`;
            }

            const embed = new Discord.RichEmbed()
                .setAuthor(`Weather forecast for ${location.name}`, 'https://cdn.discordapp.com/attachments/418723354963476500/436794552746246144/wheater.png')
                .setColor('FF0000')
                .addField(`${forecast[0].day} ${forecast[0].date}`, cast(0))
                .addField(`${forecast[1].day} ${forecast[1].date}`, cast(1))
                .addField(`${forecast[2].day} ${forecast[2].date}`, cast(2))
                .addField(`${forecast[3].day} ${forecast[3].date}`, cast(3))
                .addField(`${forecast[4].day} ${forecast[4].date}`, cast(4));
            message.channel.send(embed);
        });
    }
};
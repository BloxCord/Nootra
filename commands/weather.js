const Discord = require('discord.js');
const config = require('../storage/globalSettings.js');
const weather = require('weather-js');
const global = require('../function/global.js');

module.exports = {
    name: 'weather',
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
            result.length === 0 ? message.reply('please use a valid city.') : result.length !== 0;
            error ? message.reply('error while processing the weather of this region.') : error;

            var current = result[0].current;
            var location = result[0].location;
            var EmojiTemp = current.temperature <= 0 && global.fahrenheit(current.temperature, 'C') <= 32 ? '<:tempfreeze:436785452851265536>' : '<:temphot:436785459960610826>';
            var date = new Date(`${current.date} ${current.observationtime}`);

            const embed = new Discord.RichEmbed()
                .setDescription(`Sky is **${current.skytext}**`)
                .setAuthor(`Weather for ${location.name}`, current.imageUrl)
                .setColor('FF0000')
                .setTimestamp(date)
                .addField('Winds <:wind:436785470836572170>', current.winddisplay, false)
                .addField('Humidity <:humidity:436785438833901569>', `${current.humidity}%`, false)
                .addField(`Temperature ${EmojiTemp}`, `${current.temperature}°C / ${Math.round(global.fahrenheit(current.temperature, 'C'))}°F`, false);
            current.temperature !== current.feelslike ? embed.addField(`Feels like ${EmojiTemp}`, `${current.feelslike}°C / ${Math.round(global.fahrenheit(current.feelslike, 'C'))}°F`, false) : current.temperature === current.feelslike;
            location.alert ? embed.addField('Alert', location.alert, false) : location.alert;

            message.channel.send(embed);
        });
    }
};
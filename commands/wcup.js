const wcup = require('world-cup-history');
const Discord = require('discord.js');
const global = require('../function/global.js');
const countries = require("i18n-iso-countries");

exports.timer = '2seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);

    try {
        var cup = wcup.year(args[0]);
        var host = cup.hostCountry;
        var winner = cup.winner;
        var runnerUp = cup.runnerUp;
        var topGoal = cup.topGoalScorer[0];
        try {
            var hostCountry = countries.getAlpha2Code(host, 'en').toLowerCase();
            var hostEmoji = `:flag_${hostCountry}:`;
        } catch (error) {
            hostEmoji = '';
        }
        try {
            var winnerCountry = countries.getAlpha2Code(winner, 'en').toLowerCase();
            var winnerEmoji = `:flag_${winnerCountry}:`;
        } catch (error) {
            winnerEmoji = '';
        }
        try {
            var runnerUpCountry = countries.getAlpha2Code(runnerUp, 'en').toLowerCase();
            var runnerUpEmoji = `:flag_${runnerUpCountry}:`;
        } catch (error) {
            runnerUpEmoji = '';
        }
        try {
            var topGoalCountry = countries.getAlpha2Code(topGoal.country, 'en').toLowerCase();
            var topGoalEmoji = `:flag_${topGoalCountry}:`;
        } catch (error) {
            topGoalEmoji = '';
        }

        const Embed = new Discord.RichEmbed()
            .setColor('FF0000')
            .setAuthor(`Fifa World Cup (${args[0]})`)
            .setDescription(`
🥅 Host(s) : ${host} ${hostEmoji}
🥇 Winner : ${winner} ${winnerEmoji}
🥈 Runner Up : ${runnerUp} ${runnerUpEmoji}
⚽ Top Goal Scorer : ${topGoal.name} ${topGoalEmoji} (${topGoal.numberOfGoals} Goals)
<:users:440466171712765970> Total Attendance : ${cup.totalAttendance} 
⚔ Number of matches : ${cup.numberOfMatches}
`);
        message.channel.send(Embed);
    } catch (error) {
        message.reply('couldn\'t retrieve data for this year');
    }
};
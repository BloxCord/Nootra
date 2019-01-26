const logger = require('../function/logger.js');
const global = require('../function/global.js');
const Discord = require('discord.js');
const translate = require('google-translate-api');
const fs = require('fs');
const Langs = ['afrikaans', 'albanian', 'amharic', 'arabic', 'armenian', 'azerbaijani', 'bangla', 'basque', 'belarusian', 'bengali', 'bosnian', 'bulgarian', 'burmese', 'catalan', 'cebuano', 'chichewa', 'corsican', 'croatian', 'czech', 'danish', 'dutch', 'english', 'esperanto', 'estonian', 'filipino', 'finnish', 'french', 'frisian', 'galician', 'georgian', 'german', 'greek', 'gujarati', 'hausa', 'hawaiian', 'hebrew', 'hindi', 'hmong', 'hungarian', 'icelandic', 'igbo', 'indonesian', 'irish', 'italian', 'japanese', 'javanese', 'kannada', 'kazakh', 'khmer', 'korean', 'kurdish', 'kyrgyz', 'lao', 'latin', 'latvian', 'lithuanian', 'luxembourgish', 'macedonian', 'malagasy', 'malay', 'malayalam', 'maltese', 'maori', 'marathi', 'mongolian', 'myanmar', 'nepali', 'norwegian', 'nyanja', 'pashto', 'persian', 'polish', 'portugese', 'punjabi', 'romanian', 'russian', 'samoan', 'scottish', 'serbian', 'sesotho', 'shona', 'sindhi', 'sinhala', 'slovak', 'slovenian', 'somali', 'spanish', 'sundanese', 'swahili', 'swedish', 'tajik', 'tamil', 'telugu', 'thai', 'turkish', 'ukrainian', 'urdu', 'uzbek', 'vietnamese', 'welsh', 'xhosa', 'yiddish', 'yoruba', 'zulu'];

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));

module.exports = {
    name: 'translate',
    description: '',
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: 'utility',
    help: '',
    cooldown: 5,
    execute(client, message, args) {
        global.del(message, 5000);

        if (args[0] === 'languages') {
            const embed = new Discord.RichEmbed()
                .setAuthor('Translate command', 'https://png.icons8.com/dusk/100/000000/google-translate.png')
                .setTitle('Informations')
                .setColor("FF0000")
                .setDescription(`**Available languages** :\n ${Langs.join(('\n'))}`);
            return message.channel.send(embed);
        } else if (!args[0] || !args[1] || !args[2]) {
            const embed = new Discord.RichEmbed()
                .setAuthor('Translate command', 'https://png.icons8.com/dusk/100/000000/google-translate.png')
                .setTitle('Informations')
                .setColor("FF0000")
                .setDescription(`**Syntax** : ${serverSettings[message.guild.id].prefix}translate "your language" "desired language" "text"`);
            return message.channel.send(embed);
        } else if (args[0]) {

            var fromArg = args[0].toLowerCase();
            var toArg = args[1].toLowerCase();

            var text = args.join(' ').split(args[0]).pop().split(args[1])[1].trim();

            if (!Langs.includes(fromArg)) {
                return message.reply(`first language not found.`);
            }
            if (!Langs.includes(toArg)) {
                return message.reply(`second language not found.`);
            }

            translate(text.toLowerCase(), {
                    from: fromArg,
                    to: toArg
                }).then((res) => {

                    const embed = new Discord.RichEmbed()
                        .setAuthor('Translate command', 'https://png.icons8.com/dusk/100/000000/google-translate.png')
                        .addField("`📥` **Input**", text, false)
                        .addField("`📤` **Output**", res.text, false)
                        .setColor('FF0000')
                        .setFooter(`${global.capitalizeArg(fromArg)} -> ${global.capitalizeArg(toArg)}`);
                    return message.channel.send(embed);

                })
                .catch((error) => logger.newError(client, error, __filename));
        }
    }
};
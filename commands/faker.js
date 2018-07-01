const Discord = require('discord.js');
const config = require('../config.js');
const faker = require('faker');
const global = require('../function/global.js');

exports.timer = '10seconds';
exports.run = (client, message, args) => {
        
        global.del(message, 5000);
        var gender = Math.floor(Math.random());
        gender === 1 ? 'male' : 'female';

        var firstName = faker.name.firstName(gender);
        var lastName = faker.name.lastName(gender);
        const embed = new Discord.RichEmbed()
                .setColor('FF0000')
                .setAuthor('Random')
                .setDescription(`
\`👤\` General:
\`\`\`
First name : ${firstName}
Last name : ${lastName}
Adress : ${faker.address.streetAddress()} ${faker.address.streetName()}, ${faker.address.city()}
Mail : ${faker.internet.email(firstName, lastName)}
Phone : ${faker.phone.phoneNumber()}
\`\`\`
\`💰\` Bank:
\`\`\`
Account ID : ${faker.finance.account()}
Balance : ${faker.finance.amount()}${faker.finance.currencySymbol()}
BTC Adress : ${faker.finance.bitcoinAddress()}
Iban : ${faker.finance.iban(true)}
\`\`\`
\`🌐\` Internet:
\`\`\`
Website : ${faker.internet.domainName()}
Ip : ${faker.internet.ip()}
Session password : ${faker.internet.password(faker.random.number({"min":8, "max":25}) , true)}
\`\`\`
        `);
        message.author.send(embed);
};
const axios = require("axios");
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "ginko",
    description: "",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "utility",
    help: "",
    cooldown: 5,
    async execute(client, message, args) {
        message.delete(5000).catch(() => {
            return;
        });

        var date = new Date(new Date().toUTCString());

        function getDetails(message, ligne, arret, r) {
            var sensAller = [];
            var sensRetour = [];
            if (r) {
                r.remove(message.author.id);
            }
            axios.get(`https://api.ginko.voyage/TR/getTempsLieu.do?nom=${arret.id}`).then((data) => {
                data.data.objets.listeTemps.forEach((bus) => {
                    if (bus.sensAller && bus.numLignePublic === ligne.numLignePublic) {
                        if (bus.fiable) {
                            sensAller.push(bus.temps);
                        } else {
                            sensAller.push(`${bus.temps}*`);
                        }
                    }
                    if (!bus.sensAller && bus.numLignePublic === ligne.numLignePublic) {
                        if (bus.fiable) {
                            sensRetour.push(bus.temps);
                        } else {
                            sensRetour.push(`${bus.temps}*`);
                        }
                    }
                });

                const embed = new Discord.RichEmbed()
                    .setAuthor(`${date.getHours()}:${date.getMinutes()} UTC | Temps trouvés pour l"arret "${data.data.objets.nomExact}"`)
                    .setColor(ligne.couleurFond);
                if (sensAller.length === 0 && sensRetour.length === 0) {
                    embed.setDescription("Aucun horaire trouvé");
                } else {
                    embed.setDescription(`
        ${sensAller.length !== 0 ? (`__**Direction ${ligne.variantes[0].destination}**__
        ${sensAller.join(" - ")} 🚏`) : ""}
        ${sensRetour.length !== 0 ? (`__**Direction ${ligne.variantes[1].destination}**__
        ${sensRetour.join(" - ")} 🚏`) : ""}
        
        * = horaire théorique
        `);
                }

                return message.channel.send(embed);
            });
        }

        function getArret(message, ligne, variante, query, r) {
            var stopFound = [];
            if (ligne.variantes[variante] && query === null) {
                if (r) {
                    r.remove(message.author.id);
                }

                const embed = new Discord.RichEmbed()
                    .setColor(ligne.couleurFond)
                    .setAuthor(`Enter the name of a stop on the line "${ligne.libellePublic}"`)
                    .setDescription("type 'cancel' to cancel");
                message.channel.send(embed).then((msg) => {
                    msg.delete(11000).catch(() => {
                        return;
                    });
                });

                axios.get(`https://api.ginko.voyage/DR/getDetailsVariante.do?idLigne=${ligne.id}&idVariante=${ligne.variantes[variante].id}`).then(async (data) => {
                    try {
                        var response = await message.channel.awaitMessages((msg2) => msg2.content.length > 1, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ["time"]
                        }).catch((error) => {
                            return;
                        });
                        if (response.first()) {
                            response.first().delete(5000);
                        }
                        data.data.objets.forEach((stop) => {
                            if (response.first().content.toLowerCase() === "cancel" || response.first().content.toLowerCase() === "'cancel'") {
                                return message.reply("canceled!");
                            } else if (stop.nom.toLowerCase().includes(response.first().content.toLowerCase())) {
                                stopFound.push(stop);
                            }
                        });

                        if (stopFound.length > 5) {
                            for (stopFound; stopFound.length > 5;) {
                                stopFound.pop();
                            }
                        }

                        if (stopFound.length >= 2) {
                            var index = 1;
                            const embed = new Discord.RichEmbed()
                                .setAuthor(`Found ${stopFound.length} stop`)
                                .setColor(ligne.couleurFond)
                                .setDescription(`${stopFound.map((stop) => `**#${index++}** ${stop.nom}`).join("\n")}`);

                            message.channel.send(embed).then(async (stopMessage) => {
                                await stopMessage.react("1⃣");
                                await stopMessage.react("2⃣");
                                if (stopFound[2]) {
                                    await stopMessage.react("3⃣");
                                }
                                if (stopFound[3]) {
                                    await stopMessage.react("4⃣");
                                }
                                if (stopFound[4]) {
                                    await stopMessage.react("5⃣");
                                }

                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "1⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[0], r);
                                });
                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "2⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[1], r);
                                });
                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "3⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[2], r);
                                });
                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "4⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[3], r);
                                });
                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "5⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[4], r);
                                });
                            });
                        } else if (stopFound.length === 1) {
                            return getDetails(message, ligne, stopFound[0]);
                        } else if (stopFound.length === 0) {
                            getArret(message, ligne, variante + 1, response.first().content);
                        }
                    } catch (error) {
                        return message.reply("no stop provided. cancelling");
                    }
                });
            } else if (ligne.variantes[variante] && query !== null) {
                axios.get(`https://api.ginko.voyage/DR/getDetailsVariante.do?idLigne=${ligne.id}&idVariante=${ligne.variantes[variante].id}`).then(async (data) => {
                    try {
                        data.data.objets.forEach((stop) => {
                            if (stop.nom.toLowerCase().includes(query.toLowerCase())) {
                                stopFound.push(stop);
                            }
                        });

                        if (stopFound.length > 5) {
                            for (stopFound; stopFound.length > 5;) {
                                stopFound.pop();
                            }
                        }

                        if (stopFound.length >= 2) {
                            var index = 1;
                            const embed = new Discord.RichEmbed()
                                .setAuthor(`Found ${stopFound.length} stop`)
                                .setColor(ligne.couleurFond)
                                .setDescription(`${stopFound.map((stop) => `**#${index++}** ${stop.nom}`).join("\n")}`);

                            message.channel.send(embed).then(async (stopMessage) => {
                                await stopMessage.react("1⃣");
                                await stopMessage.react("2⃣");
                                if (stopFound[2]) {
                                    await stopMessage.react("3⃣");
                                }
                                if (stopFound[3]) {
                                    await stopMessage.react("4⃣");
                                }
                                if (stopFound[4]) {
                                    await stopMessage.react("5⃣");
                                }

                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "1⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[0], r);
                                });
                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "2⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[1], r);
                                });
                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "3⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[2], r);
                                });
                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "4⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[3], r);
                                });
                                stopMessage.createReactionCollector((reaction) => reaction.emoji.name === "5⃣" && reaction.count !== 1, {
                                    time: ms("1day")
                                }).on("collect", (r) => {
                                    return getDetails(message, ligne, stopFound[4], r);
                                });
                            });
                        } else if (stopFound.length === 1) {
                            return getDetails(message, ligne, stopFound[0]);
                        } else if (stopFound.length === 0) {
                            getArret(message, ligne, variante + 1, query);
                        }
                    } catch (error) {
                        return;
                    }
                });
            } else {
                return message.reply("couldn't find this stop, please try again");
            }
        }

        axios.get("https://api.ginko.voyage/DR/getLignes.do").then((data) => {
            var arrayLigne = data.data.objets;
            var lignesFound = [];
            var index = 1;
            arrayLigne.forEach((ligne) => {
                if (ligne.libellePublic.toLowerCase().includes(args.join(" ").toLowerCase()) || ligne.numLignePublic === args.join(" ")) {
                    lignesFound.push(ligne);
                }
            });

            if (lignesFound.length > 5) {
                for (lignesFound; lignesFound.length > 5;) {
                    lignesFound.pop();
                }
            }

            if (lignesFound.length >= 2) {
                const embed = new Discord.RichEmbed()
                    .setAuthor(`🚌 Found ${lignesFound.length} lines`)
                    .setColor("FF0000")
                    .setDescription(`${lignesFound.map((ligne) => `**#${index++}** ${ligne.libellePublic} | __**${!isNaN(ligne.numLignePublic) ? `Ligne ${ligne.numLignePublic}` : ligne.numLignePublic}**__`).join("\n")}`);

                message.channel.send(embed).then(async (lineMessage) => {
                    lineMessage.delete(15000).catch(() => {
                        return;
                    });
                    await lineMessage.react("1⃣");
                    await lineMessage.react("2⃣");
                    if (lignesFound[2]) {
                        await lineMessage.react("3⃣");
                    }
                    if (lignesFound[3]) {
                        await lineMessage.react("4⃣");
                    }
                    if (lignesFound[4]) {
                        await lineMessage.react("5⃣");
                    }

                    lineMessage.createReactionCollector((reaction) => reaction.emoji.name === "1⃣" && reaction.count !== 1, {
                        time: ms("1day")
                    }).on("collect", (r) => {
                        return getArret(message, lignesFound[0], 0, null, r);
                    });
                    lineMessage.createReactionCollector((reaction) => reaction.emoji.name === "2⃣" && reaction.count !== 1, {
                        time: ms("1day")
                    }).on("collect", (r) => {
                        return getArret(message, lignesFound[1], 0, null, r);
                    });
                    lineMessage.createReactionCollector((reaction) => reaction.emoji.name === "3⃣" && reaction.count !== 1, {
                        time: ms("1day")
                    }).on("collect", (r) => {
                        return getArret(message, lignesFound[2], 0, null, r);
                    });
                    lineMessage.createReactionCollector((reaction) => reaction.emoji.name === "4⃣" && reaction.count !== 1, {
                        time: ms("1day")
                    }).on("collect", (r) => {
                        return getArret(message, lignesFound[3], 0, null, r);
                    });
                    lineMessage.createReactionCollector((reaction) => reaction.emoji.name === "5⃣" && reaction.count !== 1, {
                        time: ms("1day")
                    }).on("collect", (r) => {
                        return getArret(message, lignesFound[4], 0, null, r);
                    });
                });
            } else if (lignesFound.length === 1) {
                getArret(message, lignesFound[0], 0, null);
            } else {
                message.reply("couldn't find this line, please try again");
            }

        });
    }
};
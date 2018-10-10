const Discord = require("discord.js");
const global = require('../function/global.js');
const config = require('../storage/globalSettings.js');

exports.timer = '2seconds';
exports.run = (client, message, args) => {
    
    global.del(message, 5000);
    
    message.author.send(
        new Discord.RichEmbed()
        .setAuthor('Changelog', 'https://png.icons8.com/maintenance/dusk/50')
        .setColor('FF0000')
        .setDescription(`
\`\`\`diff
0.20.2 (18/05/2018)
* Replaced "let" by "var" in some (all) files
* Compacted weather command

0.20.8 (19/05/2018)
+ getDate is now a global function
+ Handling more processuses
* Espion-4.0.0
* Updated contributing.md file
* Fixed crash issues with the report command
- Old command : dm

0.20.9 (20/05/2018)
+ deleting messages is now a global function
+ Every command is now called by a message and args 
* Fixed crash issues when trying to delete messages without permissions

0.21.0 (22/05/2018)
* Changed from dropbox to github since it is no more supported by Heroku
* Changed the way to indicate changes from "---" to "*" in the changelog

0.21.1 (23/05/2018) && (27/05/2018)
+ Sending heartbeats every 2 minutes
* invite command is now in the guild command
* .gitignore
* JSdoc in global functions
- Old command : invite
- travis.yml file

0.22.0 (09/06/2018)
+ New command : fortnite
+ Stats on dev server

0.23.0 (14/06/2018)
* Compacted some commands
* queue will now show a number for each song

0.24.0 (19/06/2018)
+ New command : wcup
+ New command : ascii

0.24.1 (29/06/2018)
* Fixed a bug where ${config.name} would enter in a loop, repeating a command over and over

0.25.0 (01/07/2018)
+ New command : playsearch

0.25.1
+ New command : math
+ Espion now gather messages attachments(4.1.0)

1.0.0
+ Serverside config
+ New command : settings
* Fixing multiple camelCase issues
* Adapted commands to fit new config
* Minors & majors bug fixed
\`\`\``));
};
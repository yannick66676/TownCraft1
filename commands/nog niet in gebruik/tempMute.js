const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

// !tempmute gebruiker tijd 1h

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry jij kunt dit niet doen.");

var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

if (!user) return message.channel.send("Geef een gebruiker op of de gebruiker is niet in de server");

if (user.hasPermissions("MANAGE_MESSAGES")) return message.channel.send("Sorry jij kunt deze persoon niet tempmuten.");

var muteRole = message.guild.roles.find("name", "muted");

if(!muteRole) return message.channel.send("De role muted bestaat niet.");

var muteTime = args[1];

if(!muteTime) return message.channel.send("Geef een tijd mee.");

await (user.addRole(muteRole.id));

message.channel.send(`${user} is gemuted voor ${muteTime}`);

setTimeout(function () {
 
    user.removeRole(muteRole.id);
  
    message.channel.send(`${user} is geunmuted`);
    
}, ms(muteTime));

}

module.exports.help = {
    name: "tempmute"
}
const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    try{

        var text = "```TownCraft bot \n\n Commands \n Openbare commands \n (✔) -report \n Report iemand in de server. \n (✔) -ticket \n Open een ticket. \n\n  (🎵) Muziek commando's \n (🎵) -play \n Stuur een link van YouTube \n (🎵) -search \n Type een nummernaam in en kies 1-10 \n (🎵) -queue \n De muziek queue. \n (🎵) -skip \n Sla een liedje over. \n (🎵) -pause \n Pauzeer de bot.\n  (🎵) -resume \n Laat de bot verder spelen.\n (🎵) -volume \n Verander de volume van 0-150 \n (🎵) -leave \n Laat de bot de channel leaven. \n \n (⛔) Moderatie commands) \n (⛔) -close \n Sluit een ticket.\n (⛔) -prefix \n Verander de bot prefix! \n (⛔) -giveaway <aantal prijzen> <tijd in seconde> <prijs> \n een giveaway starte!```"

        message.author.send(text);

        message.channel.send("Al de commands kan je vinden in privé.");

    }catch (error){
        message.channel.send("Er is iets fout gebeurd");
    }
    

}

module.exports.help = {
    name: "help"
}
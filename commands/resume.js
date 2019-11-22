module.exports.run = async (bot, message, args, ops) => {
 
    // Gegevens ophalen.
    var guildIDData = ops.active.get(message.guild.id);
 
    // Nakijken als er al een liedje aan het afspelen is.
    if (!guildIDData) return message.channel.send("Er zijn geen liedjes aan het afspelen op dit moment.");
 
    // Nakijken als de gebruiker in het kanaal zit van de bot.
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Sorry je bent niet in het zelfde kanaal als de bot");
 
    // Nakijken als het liedje niet gepauzeerd is.
    if (!guildIDData.dispatcher.paused) return message.channel.send("De muziek is niet gepauzeerd.");
 
    // start het liedje terug.
    guildIDData.dispatcher.resume();
 
    // Stuur bericht.
    message.channel.send(`Succesvol gestart ${guildIDData.queue[0].songTitle}.`);
 
}
 
module.exports.help = {
    name: "resume"
}
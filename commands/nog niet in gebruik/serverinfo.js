const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var icon = message.guild.iconURL;

    var serverEmbed = new discord.RichEmbed()
    .setDescription("server info")
    .setColor("#ffff1a")
    .setThumbnail(icon)
    .addField("Bot naam", bot.user.username)
    .addField("Je bent gejoind op", message.member.joinedAt)
    .addField("Totaal members", message.guild.memberCount);

    return message.channel.send(serverEmbed);
    

}

module.exports.help = {
    name: "serverinfo"
}
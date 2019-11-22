const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warning.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry jij mag dit niet doen");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker op of deze gebruiker is niet op de server");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry je mag geen Staff waarschuwen");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden op.");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warning.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("warn")
        .setColor("#ee0000")
        .addField("warned gebruiker", user)
        .addField("Gewarned door", message.author)
        .addField("Aantal warns", warns[user.id].warns)
        .addField("Reden", reason);

    var warnChannel = message.guild.channels.find(`name`, "straffen");
    if (!warnChannel) return message.guild.send("Kan het kanaal niet vinden");

    warnChannel.send(warnEmbed);

    if (warns[user.id].warns == 3) {


        var warnbericht = new discord.RichEmbed()
            .setDescription("PAS OP" + user)
            .setColor("#ee0000")
            .addField("Bericht", "Nog één warn en je krijgt een ban!!!!!!");


            message.channel.send(warnbericht);

    } else if (warns[user.id].warns == 4) {

        message.guild.member(user).ban(reason);
        message.channel.send(`${user} is verbannen!!!`);


    }


}

module.exports.help = {
    name: "warn"
}
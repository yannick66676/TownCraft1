const discord = require("discord.js");
const botConfig = require("./botConfig.json");

const fs = require("fs");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`)

        bot.commands.set(fileGet.help.name, fileGet);

    })
});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("-help", { type: "WATCHING" });
})
bot.on("guildMemberAdd", member => {


    var role = member.guild.roles.find("name", "***"); // <== member is de role die je krijgt je kan hem aanpassen naar wat je wilt.
    
    if (!role) return;
    
    member.addRole(role);
    
    const channel = member.guild.channels.find("name", "***"); // <== channel naam je kan hem veranderen naar je welkomskanaal
    
    if(!channel) return;
    
    channel.send(`Welkom bij TownCraft ${member}`); // <== custom welkom bericht
    
    
    
    
    })

var swearWords = ["kut","kanker","kut","hoer","tyfus","kkr","Kanker","tering","lijer","motherfucker","fuck","fucker","shit","neger"];

bot.on("message", async message => {

    // Als bot bericht stuurt stop
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;


    // var prefix = botConfig.prefix

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));


    var ops = {
        active: active
    }



    if (commands) commands.run(bot, message, args, ops);

    var msg = message.content.toLowerCase();

    for (var i = 0; i < swearWords.length; i++) {

        if (msg.includes(swearWords[i])) {

            message.delete();

            return message.channel.send("Gelieve niet te vloeken").then(msg => msg.delete(3000));

        }

    }
});

bot.login(botConfig.token);

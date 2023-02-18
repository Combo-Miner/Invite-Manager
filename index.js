//get info about a specific user in youtube channel with his total views and total subscribers
const config = require('./config.json');
const discord = require("discord.js")
const client = new discord.Client({intents : 32767});
//we gonna use quick.db to store the prefix in the database
const db = require('quick.db');
//collection for the commands
client.commands = new discord.Collection();
//here we gonna set some proprieties for the client like the prefix and the db so we can directly use it without importing them
client.config = config;
client.db = db;
client.guildInvites = new Map();
//requires the handler
module.exports = client;
require('./handler')(client);


//when the bot is mentionned we gonna return the prefix
client.on("messageCreate", async (message) => {
    if(message.author.bot) return;
    if(message.channel.type == "DM") return;
    //we gona use regex so we can see if the message contains onyly the bot mention and nothing else)
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
        //we gonna use the get method to get the prefix from the database
        let prefix = db.get(`prefix_${message.guild.id}`);
        //if there is no prefix we gonna use the default prefix
        if(!prefix) prefix = config.prefix;
        //we gonna send the prefix in the channel
        message.reply(`Mon prefix est \`${prefix}\``)
    }
})
client.login(config.token);
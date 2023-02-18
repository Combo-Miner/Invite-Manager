const client = require("../../index.js");
const db = client.db


client.on("messageCreate", async (message) => {
    let prefix = db.get(`prefix_${message.guild.id}`);
    if(!prefix) prefix = client.config.prefix;
    if(message.author.bot) return;
    if(message.channel.type == "DM") return;
    if(!message.content.startsWith(prefix)) return;
    //explain 
    //we gonna use the slice method to remove the prefix from the message
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    // we gonna use the shift method to remove the first element of the array
    const commandName = args.shift().toLowerCase();
    //we gonna use the get method to get the command from the collection that we created early in the index.js file
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

     if(command){
        //we gonna use the execute method to execute the command or event the run method
    //    command.run(message, args, client);
    //we have three arguments the message, the args and the client so we can use it in the command file
    //check for perm cause im lazy to add it in every command
    if(command.directory == "private" ) {
        if(db.get("owners_" + message.guild.id + "_" + message.author.id) == true || message.author.id == client.config.ownerID) {
            command.execute(message, args, client);
        } else {
           return;
        }
    } else {
        command.execute(message, args, client);
    }
    }
})
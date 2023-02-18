const {Message, MessageEmbed} = require("discord.js");

module.exports = {
    name : "help",
    helpname : "help <command>",
    description : "Affiche la liste des commandes",
     /**
     * 
     * @param {Message} message 
     */
    execute(message, args, client) {
        //first we gonna check if there is an argument after the "help" if not we gonna send the list of commands
        if(!args[0]) {
            //we gonna get the prefix
            let prefix = client.db.get(`prefix_${message.guild.id}`);
            if(!prefix) prefix = client.config.prefix;
            //we gonna create an embed
            const embed = new MessageEmbed()
            .setTitle("Liste des commandes")
            .setColor("RANDOM")
            //we gonna create a variable that we gonna use to store the commands
            let commands = "";
            //we gonna use the forEach method to loop through the collection
            client.commands.forEach(command => {
                //we gonna check if the command is in the public folder
                    commands += `\`${prefix}${command.helpname}\` - ${command.description}\n`
                
            })
            //we gonna add the variable to the embed
            embed.setDescription(commands)
            //we gonna send the embed
            message.channel.send({embeds : [embed]})
        } else {
            //if there is an argument we gonna check if the command exist
            const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
            //if the command doesn't exist we gonna send an error message
            if(!command) return message.channel.send({embeds : [new MessageEmbed().setTitle("Erreur").setDescription("Cette commande n'existe pas").setColor("RED")]})
            //if the command exist we gonna create an embed
            const embed = new MessageEmbed()
            .setTitle(`Commande ${command.name}`)
            .setColor("RANDOM")
            //we gonna add the description of the command to the embed
            embed.setDescription(command.description)
            //we gonna add the usage of the command to the embed
            embed.addField("Utilisation", command.helpname)
            //we gonna send the embed
            message.channel.send({embeds : [embed]})
        }   
    }
}
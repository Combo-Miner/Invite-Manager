
const { MessageEmbed,Message } = require("discord.js");
const { Client } = require("discord.js");


module.exports = {
    name : "setprefix",
    helpname : "setprefix <new prefix>",
    description : "Change le prefix du bot",
    /**
     * 
     * @param {Message} message 
     */
    execute(message, args, client) {
        //first we gonna check if the user has the MANAGE_GUILD permission if not we gonna send an error message
        let db = client.db
        if(db.get("owners_" + message.guild.id + "_" + message.member.id) == true|| message.member.id == client.config.ownerID) {
        //if the user has the permission we gonna check if there is an argument after the "prefix" if not we gonna send an error message
        if(!args[0]) return message.channel.send({embeds : [new MessageEmbed().setTitle("Erreur").setDescription("Veuillez spécifier un nouveau prefix").setColor("RED")]})
        //if there is an argument we gonna set the prefix in the database
        if(args[0].length > 5) return message.channel.send({embeds : [new MessageEmbed().setTitle("Erreur").setDescription("Le prefix ne peut pas dépasser 5 caractères").setColor("RED")]}); //if the prefix is longer than 5 characters we gonna send an error message
        client.db.set(`prefix_${message.guild.id}`, args[0])
        //then we gonna send a success message
        message.channel.send({embeds : [new MessageEmbed().setTitle("Succès").setDescription(`Le prefix a été changé en \`${args[0]}\``).setColor("GREEN")]})
    }
}
}
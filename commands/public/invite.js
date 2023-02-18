const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'invites',
    aliases: ["invite"],
    helpname : "invites",
    description : "Permet de voir son nombre d'invitations",
     async execute (message, args, client) {

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const member = client.users.cache.get(user.id)
        //getting the data 
            let inv = db.fetch(`invites_${message.guild.id}_${member.id}`);
            let leaves = db.fetch(`leaves_${message.guild.id}_${member.id}`);
            let Regular = db.fetch(`Regular_${message.guild.id}_${member.id}`);
            const embed = new Discord.MessageEmbed()
            embed.setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
            //set embed invisible color
            embed.setColor("2F3136")
            embed.setFooter(`Demandé par ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            embed.setDescription(`Vous avez actuellement **${inv || 0}** ${inv || 0 > 1 ? "invites" : "invite"}\n(**${Regular || 0}** join, **${leaves || 0}** leave)`)

            message.channel.send({embeds :[embed]});
      

    }
    }
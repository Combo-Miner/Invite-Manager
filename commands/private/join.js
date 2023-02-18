const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
module.exports = {
  name: "join",
  helpname: "join settings",
  description: "Permet de configurer les paramètres de join",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   async execute (message, args, client) {
    const color = "2f3136"
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (!prefix) {
      prefix = client.config.prefix
    }
    const filterSelect = i => i.user.id == message.author.id;
    const filterForIt = i => i.user.id == message.author.id
    const coll = await message.channel.createMessageComponentCollector({ filter: filterForIt, time: (ms(`5m`)), componentType: `SELECT_MENU` })
    const colB = await message.channel.createMessageComponentCollector({ filter: filterForIt, time: (ms(`5m`)), componentType: `BUTTON` })

    if (args[0] == "settings") {

      function updateembed(msg) {


        if (db.get(`welcomestyle_${message.guild.id}_${message.id}`) === "message" || db.get(`welcomestyle_${message.guild.id}_${message.id}`) === null) {
          const embed = new MessageEmbed()
            .setTitle(`Configuration Join`)
            .setColor(color)
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            .addField("Rôle membre", db.get(`autorole_${message.guild.id}`) === null ? "Aucun" : `<@&${db.get(`autorole_${message.guild.id}`)}> (${db.get(`autorole_${message.guild.id}`)})`)
            .addField("Salon de bienvenue", db.get(`joinchannelmessage_${msg.guild.id}`) === null ? "Aucun" : `<#${db.get(`joinchannelmessage_${msg.guild.id}`)}> (${db.get(`joinchannelmessage_${msg.guild.id}`)})`)
            .addField("Message de bienvenue", db.get(`joinmessage_${msg.guild.id}`) === null ? db.get(`joinmessageembed_${message.guild.id}`) === null ? "Default" : "Embed" : `${db.get(`joinmessage_${msg.guild.id}`)}`)
            .addField("MP de bienvenue", db.get(`joindmee_${msg.guild.id}`) === null ? "Aucun" : `${db.get(`joindmee_${msg.guild.id}`)}`)



          let menuoptions = [
            { value: "Style Embed", description: "", emoji: "📑" },
            { value: "Modifier l'autorole", description: "", emoji: "👤" },
            { value: "Supprimer l'autorole", description: "", emoji: "👥" },
            { value: "Modifier le salon de bienvenue", description: "", emoji: "🏷️" },
            { value: "Supprimer le salon de bienvenue", description: "", emoji: "🛎️" },
            { value: "Modifier le message de bienvenue", description: "", emoji: "📩" },
            { value: "Supprimer le message de bienvenue", description: "", emoji: "✉️" },
            { value: "Modifier le MP de bienvenue", description: "", emoji: "📫" },
            { value: "Supprimer le MP de bienvenue", description: "", emoji: "📪" },

          ]
          const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcome")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
          let interactiveButtons = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Faix un choix')
            .setOptions(menuoptions.map(option => ({
              label: option.value,
              value: message.id + option.value,
              description: option.description,
              emoji: option.emoji

            })))
          let butt = new MessageActionRow().addComponents(bt2)
          let select = new MessageActionRow().addComponents(interactiveButtons)
          msg.edit({ embeds: [embed], components: [select, butt] })
        } else if (db.get(`welcomestyle_${message.guild.id}_${message.id}`) === "embed") {


          const embed = new MessageEmbed()
            .setTitle(`Configuration Join`)
            .setColor(color)
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            .addField("Rôle membre", db.get(`autorole_${message.guild.id}`) === null ? ":x:" : `<@&${db.get(`autorole_${message.guild.id}`)}> (${db.get(`autorole_${message.guild.id}`)})`)
            .addField("Salon de bienvenue", db.get(`joinchannelmessage_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`joinchannelmessage_${msg.guild.id}`)}> (${db.get(`joinchannelmessage_${msg.guild.id}`)})`)
            .addField("Embed de bienvenue", db.get(`joinmessage_${msg.guild.id}`) === null ? db.get(`joinmessageembed_${message.guild.id}`) === null ? "Non" : "Oui" : `Message: ${db.get(`joinmessage_${msg.guild.id}`)}`)
            .addField("MP de bienvenue", db.get(`joindmee_${msg.guild.id}`) === null ? ":x:" : `${db.get(`joindmee_${msg.guild.id}`)}`)




          let menuoptions = [
            { value: "Style Message", description: "", emoji: "📑" },
            { value: "Modifier l'autorole", description: "", emoji: "👤" },
            { value: "Supprimer l'autorole", description: "", emoji: "👥" },
            { value: "Modifier le salon de bienvenue", description: "", emoji: "🏷️" },
            { value: "Supprimer le salon de bienvenue", description: "", emoji: "🛎️" },
            { value: "Modifier l'embed de bienvenue", description: "", emoji: "📩" },
            { value: "Supprimer l'embed de bienvenue", description: "", emoji: "✉️" },
            { value: "Modifier le MP de bienvenue", description: "", emoji: "📫" },
            { value: "Supprimer le MP de bienvenue", description: "", emoji: "📪" },

          ]
          const bt1 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcomemsg")
            .setEmoji("📝")
            .setLabel("Voir l'embed de bienvenue")
          const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcome")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
          let interactiveButtons = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Faix un choix')
            .setOptions(menuoptions.map(option => ({
              label: option.value,
              value: message.id + option.value,
              description: option.description,
              emoji: option.emoji

            })))
          let butt = new MessageActionRow().addComponents([bt1, bt2])
          let select = new MessageActionRow().addComponents(interactiveButtons)
          msg.edit({ embeds: [embed], components: [select, butt] })
        }
      }




      message.channel.send(`Prêt`).then(async m => {
        updateembed(m)
        setTimeout(() => {
          m.edit({
            components: [], embeds: [new MessageEmbed()
              .setTitle(`Configuration Join`)
              .setColor(color)
              .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
              .addField("Rôle membre", db.get(`autorole_${message.guild.id}`) === null ? ":x:" : `<@&${db.get(`autorole_${message.guild.id}`)}> (${db.get(`autorole_${message.guild.id}`)})`)
              .addField("Salon de bienvenue", db.get(`joinchannelmessage_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`joinchannelmessage_${message.guild.id}`)}> (${db.get(`joinchannelmessage_${message.guild.id}`)})`)
              .addField("Message de bienvenue", db.get(`joinmessage_${message.guild.id}`) === null ? db.get(`joinmessageembed_${message.guild.id}`) === null ? "Default" : "Embed" : `${db.get(`joinmessage_${message.guild.id}`)}`)
              .addField("MP de bienvenue", db.get(`joindmee_${message.guild.id}`) === null ? ":x:" : `${db.get(`joindmee_${message.guild.id}`)}`)
            ]
          })
  
        }, 60000 * 5)

        const filter = m => m.author.id === message.author.id

        colB.on('collect', async (i) => {

          if (!i.isButton()) return;
          if (i.user.id !== message.author.id) return;
          if (i.customId == message.id + "welcomemsg") {
            await i.deferUpdate()
            if (db.get(`joinmessageembed_${message.guild.id}`) !== null) {
              message.channel.send({ embeds: [db.get(`joinmessageembed_${message.guild.id}`)] })
            }
          }
          if (i.customId === message.id + "welcome") {
            await i.deferUpdate()

            updateembed(m)
          }

        })


        coll.on('collect', async (i) => {
         

          if (i.user.id !== message.author.id) return;
          switch (i.values[0]) {
            case message.id + "Style Embed":
              await i.deferUpdate()
              db.set(`welcomestyle_${message.guild.id}_${message.id}`, "embed")

              updateembed(m)
              break
            case message.id + "Style Message":
              await i.deferUpdate()
              db.set(`welcomestyle_${message.guild.id}_${message.id}`, "message")
              updateembed(m)
              break
            case message.id + "Modifier l'embed de bienvenue":
              await i.deferUpdate()
              db.set(`joinmessage_${message.guild.id}`, null)
              embedmsg(m)
              break

            case message.id + "Supprimer l'embed de bienvenue":
              await i.deferUpdate()
              db.set(`joinmessageembed_${message.guild.id}`, null)
              updateembed(m)
              break
            case message.id + "Modifier le greet message":
              await i.deferUpdate()
              message.channel.send(`Au bout de combien de temps **doit se supprimer le message d'arrivée ?** (*15m max*)`).then(mp => {
                mp.channel.awaitMessages(
                  {
                    filter: filter,
                    max: 1,
                    time: 60000,
                    errors: ['time']
                  })
                  .then(cld => {

                    var msg = cld.first();
                    if (!msg.content.endsWith("m") && !msg.content.endsWith("s")) return message.channel.send(`Format invalide`)


                    db.set(`joinmsgdel_${message.guild.id}`, msg.content)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case message.id + "Supprimer le greet message":
              await i.deferUpdate()
              db.set(`joinmsgdel_${message.guild.id}`, null)
              updateembed(m)
              break
            case message.id + "Modifier l'autorole":
              await i.deferUpdate()
              message.channel.send(`Quel est **le nouveau rôle membre** ?`).then(mp => {
                mp.channel.awaitMessages(
                  {
                    filter: filter,
                    max: 1,
                    time: 60000,
                    errors: ['time']
                  })
                  .then(cld => {

                    var msg = cld.first();
                    var role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${msg.content}\`.`);

                    db.set(`autorole_${message.guild.id}`, role.id)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case message.id + "Supprimer l'autorole":
              await i.deferUpdate()
              db.delete(`autorole_${message.guild.id}`)
              updateembed(m)
              break
            case message.id + "Modifier le salon de bienvenue":
              await i.deferUpdate()
              message.channel.send(`Quel est **le nouveau salon de bienvenue** ?`).then(mp => {
                mp.channel.awaitMessages(
                  {
                    filter: filter,
                    max: 1,
                    time: 60000,
                    errors: ['time']
                  })
                  .then(cld => {

                    var msg = cld.first();
                    var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                    if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

                    db.set(`joinchannelmessage_${message.guild.id}`, role.id)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case message.id + "Supprimer le salon de bienvenue":
              await i.deferUpdate()
              db.delete(`joinchannelmessage_${message.guild.id}`)
              updateembed(m)
              break
            case message.id + "Modifier le message de bienvenue":
              await i.deferUpdate()
              let embed = new MessageEmbed()
                .setColor(color)
                .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                .addField(`Informations sur l'utilisateur : `, `Mention de l'user : {user}
              Id de l'user : {user:id}
              Tag de l'user : {user:tag}
              Nom de l'user : {user:name}`)
                .addField("Informations sur l'inviteur : ", `Mention de l'inviteur : {inviter}
              Id de l'inviteur : {inviter:id}
              Tag de l'inviteur : {inviter:tag}
              Nom de l'inviteur : {inviter:name}
              Nombre d'invitations : {invite}`)
                .addField("Informations sur le serveur : ", `Membres totaux : {guild:member}
              Serveur : {guild:name}`)
              message.channel.send({ embeds: [embed] })
              message.channel.send("Quel est **le nouveau message de bienvenue** ?").then(mp => {
                mp.channel.awaitMessages(
                  {
                    filter: filter,
                    max: 1,
                    time: 60000,
                    errors: ['time']
                  })
                  .then(cld => {

                    var msg = cld.first();
                    db.set(`joinmessageembed_${message.guild.id}`, null)
                    db.set(`joinmessage_${message.guild.id}`, msg.content)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })

              break
            case message.id + "Supprimer le message de bienvenue":
              await i.deferUpdate()
              db.delete(`joinmessage_${message.guild.id}`)
              updateembed(m)
              break
            case message.id + "Modifier le MP de bienvenue":
              await i.deferUpdate()
              let embeds = new MessageEmbed()
                .setColor(color)
                .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                .addField(`Informations sur l'utilisateur : `, `Mention de l'user : {user}
              Id de l'user : {user:id}
              Tag de l'user : {user:tag}
              Nom de l'user : {user:name}`)
                .addField("Informations sur le serveur : ", `Membres totaux : {guild:member}
              Serveur : {guild:name}`)

              message.channel.send({ embeds: [embeds] })
              message.channel.send("Quel est **le DM salon de bienvenue** ?").then(mp => {
                mp.channel.awaitMessages(
                  {
                    filter: filter,
                    max: 1,
                    time: 60000,
                    errors: ['time']
                  })
                  .then(cld => {

                    var msg = cld.first();


                    db.set(`joindmee_${message.guild.id}`, msg.content)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case message.id + "Supprimer le MP de bienvenue":
              await i.deferUpdate()
              db.delete(`joindmee_${message.guild.id}`)
              updateembed(m)
              break
          }

        })
      })


      async function embedmsg(m) {
        const filterMessage = m => message.author.id === m.author.id;
        const filter = m => message.author.id === m.author.id;
        let menuoptions = [
          { value: "Copier un embed", description: "", emoji: "📥" },
          { value: "Modifier le titre", description: "", emoji: "🖊" },
          { value: "Supprimer le titre", description: "", emoji: "💥" },
          { value: "Modifier la description", description: "", emoji: "💬" },
          { value: "Supprimer la description", description: "", emoji: "📝" },
          { value: "Modifier l'auteur", description: "", emoji: "🕵️" },
          { value: "Supprimer l'auteur", description: "", emoji: "✂" },
          { value: "Modifier le footer", description: "", emoji: "🔻" },
          { value: "Supprimer le footer ", description: "", emoji: "🔺" },
          { value: "Modifier le thumbnail", description: "", emoji: "🔳" },
          { value: "Modifier l'image", description: "", emoji: "🖼️" },
          { value: "Modifier l'url du titre", description: "", emoji: "🌐" },
          { value: "Modifier la couleur", description: "", emoji: "🎨" },
          { value: "Supprimer la couleur", description: "", emoji: "🔵" },


        ]
        const embedbase = new MessageEmbed()
          .setDescription("** **")
        let interactiveButtons = new MessageSelectMenu()
          .setCustomId(message.id + 'MenuSelection')
          .setMaxValues(1)
          .setMinValues(1)
          .setPlaceholder('Faix un choix')
          .setOptions(menuoptions.map(option => ({
            label: option.value,
            value: message.id + option.value,
            description: option.description,
            emoji: option.emoji,


          })
          ))
        const bt = new MessageButton()
          .setStyle("SUCCESS")
          .setCustomId("embedmsg1" + message.id)
          .setEmoji("✅")
          .setLabel("Valider")
        const bt3 = new MessageButton()
          .setStyle("PRIMARY")
          .setCustomId("embedmsg3" + message.id)
          .setEmoji("❌")
          .setLabel("Re formuler votre choix")
        let butt = new MessageActionRow().addComponents([bt, bt3])
        let select = new MessageActionRow().addComponents(interactiveButtons)
        let embed = new MessageEmbed()
          .setColor(color)
          .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
          .addField(`Informations sur l'utilisateur : `, `Mention de l'user : {user}
        Id de l'user : {user:id}
        Tag de l'user : {user:tag}
        Nom de l'user : {user:name}`)
          .addField("Informations sur l'inviteur : ", `Mention de l'inviteur : {inviter}
        Id de l'inviteur : {inviter:id}
        Tag de l'inviteur : {inviter:tag}
        Nom de l'inviteur : {inviter:name}
        Nombre d'invitations : {invite}`)
          .addField("Informations sur le serveur : ", `Membres totaux : {guild:member}
        Serveur : {guild:name}`)
        message.channel.send({embeds : [embed]})
        message.channel.send({
          embeds: [ embedbase], components: [butt, select]
        }).then(async msgg => {
          setTimeout(() => {
            msgg.delete()
          }, 60000 * 15)

          colB.on('collect', async (i) => {
            if (i.user.id !== message.author.id) return i.reply({ content: "Tu n'as le droit d'utiliser cette interaction", ephemeral: true })
            if (i.customId === "embedmsg1" + message.id) {
              await i.deferUpdate()
              db.set(`joinmessageembed_${message.guild.id}`, msgg.embeds[0])
              msgg.delete()
              updateembed(m)
            }
            if (i.customId === "embedmsg3" + message.id) {
              await i.deferUpdate()
              msgg.edit(msgg.embeds)
            }
          })

          coll.on("collect", async (i) => {
            if (i.user.id !== message.author.id) return i.reply({ content: "Tu n'as le droit d'utiliser cette interaction", ephemeral: true })
            switch (i.values[0]) {
              case message.id + "Modifier le titre":
                await i.deferUpdate()
                let question = await message.channel.send("Quel est **le nouveau titre de l'embed ?**")

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()

                  collected.first().delete()
                  question.delete()
                  embedbase.setTitle(collected.first().content)
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier le Titre !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer le titre":
                await i.deferUpdate()
                embedbase.setTitle("** **")
                msgg.edit({ embeds: [embedbase] })
                break

              case message.id + "Modifier la description":
                await i.deferUpdate()
                let descriptionques = await message.channel.send("Quel est **la nouvelle description de l'embed ?**")

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()

                  collected.first().delete()
                  descriptionques.delete()
                  embedbase.setDescription(collected.first().content)
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier la description !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer la description":
                await i.deferUpdate()
                embedbase.setDescription("** **")
                msgg.edit({ embeds: [embedbase] })
                break

              case message.id + "Modifier l'auteur":
                await i.deferUpdate()
                const embedquest = new Discord.MessageEmbed()

                let SELAMq = await message.channel.send("Quel est **le nouveau autheur de l'embed ?", embedquest.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()

                  collected.first().delete()
                  SELAMq.delete()
                  if (collected.first().mentions.users.size <= 0) {
                    auteur = collected.first().content;
                    const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Author, sinon entrez `non`");
                    const auteurImg = (await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })).first();
                    question2.delete();
                    auteurImg.delete();
                    const img = auteurImg.content
                    const liens = [
                      "https://",
                      "http://",
                      "https",
                      "http"
                    ];
                    if (!liens.some(word => img.includes(word))) {
                      embedbase.setAuthor(auteur)
                      message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar a votre Author ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 }))
                    }

                    if (liens.some(word => img.includes(word))) {
                      embedbase.setAuthor(auteur, auteurImg.content)
                    }
                  }
                  if (collected.first().mentions.users.size > 0) {
                    auteur = collected.first().mentions.users.first();

                    embedbase.setAuthor({ name: auteur.username, iconURL: auteur.displayAvatarURL({ dynamic: true }) });
                  }
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier l'Author !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer l'auteur":
                await i.deferUpdate()
                embedbase.setAuthor("** **")
                msgg.edit(embedbase)
                break
              case message.id + "Modifier le footer":
                await i.deferUpdate()
                const embedtttt = new MessageEmbed()
                let TDCQUEST2 = await message.channel.send("Quel **Footer** voulez-vous attribuez à l'embed ?", embedtttt.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()

                  collected.first().delete()
                  TDCQUEST2.delete()
                  if (collected.first().mentions.users.size <= 0) {
                    footer = collected.first().content;
                    const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Footer, sinon entrez `non`");
                    const footerImg = (await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })).first();
                    question2.delete();
                    footerImg.delete();
                    const img = footerImg.content
                    const liens = [
                      "https://",
                      "http://",
                      "https",
                      "http"
                    ];
                    if (!liens.some(word => img.includes(word))) {
                      embedbase.setFooter(footer)
                      message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar au Footer ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 }))
                    }

                    if (liens.some(word => img.includes(word))) {
                      embedbase.setFooter(footer, footerImg.content)
                    }
                  }
                  if (collected.first().mentions.users.size > 0) {
                    footer = collected.first().mentions.users.first();

                    embedbase.setFooter(footer.username, footer.displayAvatarURL({ dynamic: true }));
                  }
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier le Footer !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })

                break

              case message.id + "Supprimer le footer":
                await i.deferUpdate()
                embedbase.setFooter("** **")
                msgg.edit({ embeds: [embedbase] })
                break
              case message.id + "Modifier le thumbnail":
                await i.deferUpdate()
                let PASDETDCMEC = await message.channel.send("Quel **Thumbnail** voulez-vous attribuez à l'embed ?")

                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()

                  const thumbnail = collected.first().content
                  const liens = [
                    "https://",
                    "http://",
                    "https",
                    "http"
                  ];
                  if (!liens.some(word => thumbnail.includes(word))) {
                    collected.first().delete()
                    PASDETDCMEC.delete()
                    return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 }))
                  }


                  collected.first().delete()
                  PASDETDCMEC.delete()
                  embedbase.setThumbnail(collected.first().content)
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier le Thumbnail !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })

                break

              case message.id + "Supprimer le thumbnail":
                embedbase.setThumbnail("htps://slm.com")
                msgg.edit(embedbase)
                break
              case message.id + "Modifier l'image":
                await i.deferUpdate()
                let heh1 = await message.channel.send("Quel **Image** voulez-vous attribuez à l'embed ?")

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()

                  const image = collected.first().content
                  const liens = [
                    "https://",
                    "http://",
                    "https",
                    "http"
                  ];
                  if (!liens.some(word => image.includes(word))) {
                    collected.first().delete()
                    heh1.delete()
                    return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 }))
                  }


                  collected.first().delete()
                  heh1.delete()
                  embedbase.setImage(collected.first().content, { size: 4096 })
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier l'Image !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer l'image":
                await i.deferUpdate()
                embedbase.setImage("htps://slm.com")
                msgg.edit({ embeds: [embedbase] })
                break

              case message.id + "Modifier l'url du titre":
                await i.deferUpdate()
                let WASSIMLEMAITRE = await message.channel.send("Quel **URL** voulez-vous attribuez à l'embed ?")

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()

                  const url = collected.first().content
                  const liens = [
                    "https://",
                    "http://",
                    "https",
                    "http"
                  ];
                  if (!liens.some(word => url.includes(word))) {
                    collected.first().delete()
                    WASSIMLEMAITRE.delete()
                    return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 }))
                  }


                  collected.first().delete()
                  WASSIMLEMAITRE.delete()
                  embedbase.setURL(collected.first().content)
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier l'Url !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer l'url du titre":
                await i.deferUpdate()
                embedbase.setURL("htps://")
                msgg.edit(embedbase)
                break
              case message.id + "Supprimer l'image":
                await i.deferUpdate()
                embedbase.setImage("** **")
                msgg.edit(embedbase)
                break

              case message.id + "Modifier la couleur":
                await i.deferUpdate()
                let HEHEHHE = await message.channel.send("Quel **Couleur** voulez-vous attribuez à l'embed ?")

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()


                  collected.first().delete()
                  HEHEHHE.delete()
                  embedbase.setColor(collected.first().content)
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier la Couleur !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer la couleur":
                await i.deferUpdate()
                embedbase.setColor("WASSIM")
                msgg.edit({ embeds: [embedbase] })
                break



              case message.id + "Copier un embed":
                await i.deferUpdate()
                const channID = await message.channel.send("Quel est **le salon ou ce trouve le message à copier ?** (*ID*)");
                const channel_id = (await message.channel.awaitMessages({ filter: filterMessage, max: 1, time: 60000 })).first();
                channID.delete();
                channel_id.delete();
                if (!Number(channel_id.content) || !message.guild.channels.cache.get(channel_id.content)) return message.channel.send(`Aucun salon trouvé pour \`${channel_id.content}\``).then(msg => msg.delete({ timeout: 5000 }));
                const msgQuestionMessageID = await message.channel.send("Quel est **le message de l'embed à copier ?** (*Une ID*)");
                const message_id = (await message.channel.awaitMessages({ filter: filterMessage, max: 1, time: 60000 })).first();
                msgQuestionMessageID.delete();
                message_id.delete();
                if (!Number(message_id.content) || !message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({ timeout: 5000 }));
                const msg = await message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content);
                if (msg.embeds.length === 0) return message.channel.send("Ce message n'est pas un embed").then(msg => msg.delete({ timeout: 50000 }));
                if (msg.partial) {
                  try {
                    await msg.fetch()
                  } catch {
                    return
                  }
                }
                msgg.edit({ embeds: [msg.embeds[0].toJSON()] })

                break


            }
          })


        })
      }
    }
  }
}
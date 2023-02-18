
const { MessageEmbed } = require("discord.js");

const client = require("../../index")

client.on("inviteDelete",async ( invite) => {
    let db = client.db
    let invites = await invite.guild.fetch()
    if(invite.guild.vanityURLCode) invites.set(invite.guild.vanityURLCode, await invite.guild.fetchVanityData());
    client.guildInvites.set(invite.guild.id, invite);
    db.delete(`invites.${invite.code}`);

});
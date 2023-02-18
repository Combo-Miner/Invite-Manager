

const client = require("../../index")
client.on("inviteCreate",async (invite) => {
    let db = client.db
    let guildInvite = invite
    let invites = await  invite.guild.fetch()
    console.log(invites)
    if(invite.guild.vanityURLCode) invites.set(invite.guild.vanityURLCode, await invite.guild.fetchVanityData());
    client.guildInvites.set(invite.guild.id, invites);
    db.set(`invites.${guildInvite.code}`, {
        inviterId: guildInvite.inviter?.id,
        code: guildInvite.code,
        uses: guildInvite.uses
    });
});
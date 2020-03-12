const roles = {
    //    EMOJI ID      :       ROLE ID
    "634244188891906049": "634264609548664832", // League
    "634244189281976341": "634264722618712074", // Minecraft
    "634246510531575818": "634264822652993556", // Compass
    "634246683936555019": "634264743967719425", // Osu
    "634246997963964478": "634264915627999272", // FGO
    "634247319516086272": "634264973211860995", // Mudae
    "634250594902736896": "634265033597255692", // Pokecord
    "627723787105992725": "635242440294400000", // Gay
    "675221708285673475": "687520440977063961",
    "🔫": "683140728683364434",
    "📖": "683135069983866893",
    "🎮": "683140730444578841",
}

module.exports = (client, reaction, user) => {
    if (reaction.message.id == client.config.rolesMessageID) {
        const role = reaction.message.guild.roles.get(roles[reaction.emoji.id || reaction.emoji.name]);
        reaction.message.guild.members.get(user.id).removeRole(role);
    }
};

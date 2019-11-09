module.exports = async (client, message) => {

    if (message.author.bot) return;

    // XP

    if (message.guild) {
        const key = `${message.guild.id}-${message.author.id}`;
        client.dbM.ensure(key, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 0
        });

        client.dbM.inc(key, "points");

        const curLevel = Math.floor(0.1 * Math.sqrt(client.dbM.get(key, "points")));

        if (client.dbM.get(key, "level") < curLevel) {
          message.reply(`you are now level **${curLevel}**!`);
          client.dbM.set(key, curLevel, "level");
        }
    }

    // COMMANDS
  
    if (message.content.startsWith(client.config.prefix)) {
  
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
    
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return;

        if (!command.channelType.includes(message.channel.type)) {
            return message.channel.send("Sorry, you can't use that command here!");
        }

        if (command.permissions && !message.member.hasPermission(command.permissions)) {
            return message.channel.send(`You do not have permission to use this command! (${command.permissions.join(", ")})`);
        }

        try {
            const response = await command.execute(client, message, args);
            if (!response && command.usage) {
                command.usage(client, message);
            }
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error trying to execute that command!');
        }

    }

};
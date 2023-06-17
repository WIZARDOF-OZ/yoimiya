require('dotenv').config();
const { Client, GatewayIntentBits, Events, EmbedBuilder, ActivityType, Collection } = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const yoimiya = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages]
});
yoimiya.commands = new Collection();

const commandsKaRasta = path.join(__dirname, 'commands');
const commandKaMaal = fs.readdirSync(commandsKaRasta).filter(file => file.endsWith('.js'));

for (const file of commandKaMaal) {
    const filePath = path.join(commandsKaRasta, file)
    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        yoimiya.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

yoimiya.on(Events.ClientReady, () => {
    console.log('bot is alive')

    yoimiya.user.setActivity(`Under Developement`, ActivityType.Watching)
    const channel = yoimiya.channels.cache.get('1119346920058531931');
    // channel.send('<@952975852801523762> <@583666642010112000> Yoimiya is online');
})
yoimiya.login(process.env.token);

require('dotenv').config();
const { Client, GatewayIntentBits, Events, EmbedBuilder, ActivityType, Collection } = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const yoimiya = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});

yoimiya.commands = new Collection();

//slashcommands folder
const commandsKaRasta = path.join(__dirname, 'commands');
const commandKaMaal = fs.readdirSync(commandsKaRasta)

//sub folders of slash commands
for (const folder of commandKaMaal) {
    const sumFolders = path.join(commandsKaRasta, folder);
    const asliMaal = fs.readdirSync(sumFolders).filter(file => file.endsWith('.js'));
    for (const commands of asliMaal) {
        const filePath = path.join(sumFolders, commands)
        const command = require(filePath);
        //finally setting commands
        if ('data' in command && 'execute' in command) {
            yoimiya.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

//Event handling
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        yoimiya.once(event.name, (...args) => event.execute(...args));
    } else {
        yoimiya.on(event.name, (...args) => event.execute(...args));
    }
}


yoimiya.login(process.env.token);

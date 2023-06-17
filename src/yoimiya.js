const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
});

client.on(Events.ClientReady, (client) => {
    console.log('gg')
})
client.login(process.env.token);
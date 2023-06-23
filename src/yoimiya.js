
require('dotenv').config();
// const chalk = require('chalk');
const { Client, GatewayIntentBits, Events, EmbedBuilder, ActivityType, Collection } = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js')
const path = require('node:path');
const yoimiya = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration
    ]
}),
    { token } = require('./config.js'),
    { prefix } = require('./config.js');

yoimiya.commands = new Collection();
yoimiya.cooldowns = new Collection();
yoimiya.commmands = new Discord.Collection()

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

// regular command

const commandFolders = fs.readdirSync('./command').filter(file => file.endsWith('.js'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./command/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./command/${folder}/${file}`);
        yoimiya.commands.set(command.name, command);
    }
}


yoimiya.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!yoimiya.commands.has(commandName)) return;

    const command = yoimiya.commands.get(commandName) || yoimiya.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    const { cooldowns } = yoimiya;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
        command.execute(message, args);
    } catch (error) {
        message.reply('there was an error trying to execute that command!');
    }

})

yoimiya.login(token);

module.exports = yoimiya;


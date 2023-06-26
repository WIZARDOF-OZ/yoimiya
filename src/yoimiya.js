const express = require("express")
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hey there!'))

app.listen(port, () =>
    console.log(`Your app is listening a http://localhost:${port}`)
);

require('dotenv').config();
const { Client, GatewayIntentBits, Events, EmbedBuilder, ActivityType, Collection, AuditLogEvent } = require('discord.js');
const fs = require('fs');
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
    { prefix } = require('./config.js'),
    { emoji } = require("./config.js");
const config = require('./config.js')
const ms = require('ms')
yoimiya.commands = new Collection();
yoimiya.cooldowns = new Collection();
yoimiya.reg_cmds = new Collection();


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
console.log(`${eventFiles.length} events loaded successfully`)




//regular commands

const reg_cmd = path.join(__dirname, './reg_cmds')
const reg_cmd_folder = fs.readdirSync(reg_cmd);

for (const sub_folder of reg_cmd_folder) {

    const sub_folder_path = path.join(reg_cmd, sub_folder);
    const main_files = fs.readdirSync(sub_folder_path).filter(fk => fk.endsWith('.js'))
    // console.log(`\`${main_files} \`commands loaded successfully`)
    for (const file_path of main_files) {
        const file = path.join(sub_folder_path, file_path)
        const command = require(file);
        yoimiya.reg_cmds.set(command.name, command);
        console.log(`${file.split(reg_cmd)} loded commands`)
    }
}



yoimiya.on(Events.MessageCreate, (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    // yoimiya.commands.set(pong.name, pong)
    // if (!yoimiya.commands.has(commandName)) return;

    const command = yoimiya.reg_cmds.get(commandName) || yoimiya.reg_cmds.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // console.log(`${commandName} loaded commands`)

    console.log(`${command} is now loded`)
    if (!command) return message.react('<:YaeMikoWatching:1113478319535554610>');
    if (command) {
        command.execute(message, args);
    }
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

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!');
        }
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
            const cooldownEmbed = new EmbedBuilder()
                .setDescription(`${emoji.error} | please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
                .setColor("Red")
            return message.reply({ embeds: [cooldownEmbed] });
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    // try {
    //     command.execute(message, args);
    // } catch (error) {
    //     message.reply('there was an error trying to execute that command!');
    // }


})


yoimiya.login(token);

module.exports = yoimiya;


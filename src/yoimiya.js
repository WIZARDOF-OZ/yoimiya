

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hey there!'));

app.listen(port, () =>
    console.log(`Your app is listening a http://localhost:${port}`),
);



require('dotenv').config();
// Defining the values
const { Client, GatewayIntentBits, Events, EmbedBuilder, Collection, Partials } = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const yoimiya = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
    ],
    partials: [Partials.Channel],

});
const { token } = require('./config.js');
const { prefix } = require('./config.js');
const { emoji } = require('./config.js');
const config = require('./config.js');
const AntiSpam = require('discord-anti-spam');

// Defining global collection
yoimiya.commands = new Collection();
yoimiya.cooldowns = new Collection();
yoimiya.reg_cmds = new Collection();


//slashcommands folder
const commandsKaRasta = path.join(__dirname, 'commands');
const commandKaMaal = fs.readdirSync(commandsKaRasta);

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
    }
    else {
        yoimiya.on(event.name, (...args) => event.execute(...args));
    }
}
console.log(`${eventFiles.length} events loaded successfully`);




//regular commands

const reg_cmd = path.join(__dirname, './reg_cmds');
const reg_cmd_folder = fs.readdirSync(reg_cmd);

for (const sub_folder of reg_cmd_folder) {

    const sub_folder_path = path.join(reg_cmd, sub_folder);
    const main_files = fs.readdirSync(sub_folder_path).filter(fk => fk.endsWith('.js'));
    // console.log(`\`${main_files} \`commands loaded successfully`)
    for (const file_path of main_files) {
        const file = path.join(sub_folder_path, file_path);
        const command = require(file);
        yoimiya.reg_cmds.set(command.name, command);
        // console.log(`${file.split(reg_cmd)} loded commands`)
    }
}


// Antispam system
const antiSpam = new AntiSpam({

    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
    kickThreshold: 5, // Amount of messages sent in a row that will cause a kick.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 4, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
    ignoredPermissions: [], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredMembers: ['583666642010112000', '952975852801523762'], // Array of User IDs that get ignored.
    //muteRoleName: "muted", // Name of the role that will be given to muted users!
    removeMessages: true,
});
// for to trigger antispam
yoimiya.on('messageCreate', (message) => antiSpam.message(message));

// messageCreate event for regular commands
yoimiya.on(Events.MessageCreate, (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const { content, author, member, guild, channel } = message;


    // if (author.bot) return;
    // if (!guild) return;
    // if (!content) return;

    // const mentionRegex = new RegExp(`^<@!?${yoimiya.user.id}> `);
    // var prefix = content.match(mentionRegex) ? content.match(mentionRegex)[0] : config.prefix;
    // if (!content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();
    // yoimiya.commands.set(pong.name, pong)
    // if (!yoimiya.commands.has(commandName)) return;
    const command = yoimiya.reg_cmds.get(commandName) || yoimiya.reg_cmds.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    let instance = {
        owners: config.owners,
        color: config.color,
        emoji: config.emoji,
        commands: yoimiya.commands,
        prefix: config.prefix,
    };

    // options for the command structure
    let options = {
        name: command.name,
        description: command.description || "No Description",
        usage: command.usage || "Not Specified",
        enabled: command.enabled === false ? false : true,
        aliases: command.aliases || [],
        category: command.category || "Other",
        memberPermissions: command.memberPermissions || [],
        ownerOnly: command.ownerOnly || false,
        cooldown: command.cooldown || 0,
        execute: command.execute,

    }
    if (!command) return message.react('<:YaeMikoWatching:1113478319535554610>');

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

    // if (command.permissions) {
    //     const authorPerms = message.channel.permissionsFor(message.author);
    //     if (!authorPerms || !authorPerms.has(command.permissions)) {
    //         return message.reply('You can not do this!');
    //     }
    // }

    // Permissions for the commands
    let missingPermsMember = [];
    options.memberPermissions.forEach((perm) => {
        if (!member.permissions.has(perm)) {
            return missingPermsMember.push(perm);
        }
    });
    const noReqPermsMember = new EmbedBuilder()
        .setColor(config.color.error)
        .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${config.emoji.error} You require the following perms in order to use this command.\n${missingPermsMember.map(x => `**• ${x}**`).join("\n")}`)
    if (missingPermsMember.length > 0) return message.reply({ embeds: [noReqPermsMember] });

    // Cooldown or Slowmode
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
    /*
        // Embeds for the options
        const onDevMode = new EmbedBuilder()
            .setColor(config.color.error)
            .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${config.emoji.error} The bot is on **dev mode**, All commands are disabled right now.`);
        if (config.dev.enabled && guild.id !== config.dev.guild) return message.reply({ embeds: [onDevMode] });
    
        const disabledCmd = new EmbedBuilder()
            .setColor(config.color.error)
            .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${config.emoji.error} This command has been disabled by the bot owner.`);
        if (!options.enabled) return message.reply({ embeds: [disabledCmd] })
    
        const ownerOnlyCmd = new EmbedBuilder()
            .setColor(config.color.error)
            .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${config.emoji.error} Only the bot owner can use this command.`);
        if (options.ownerOnly && !config.owners.includes(author.id)) return message.reply({ embeds: [ownerOnlyCmd] });
    */
    if (command) {
        command.execute(message, args, args.join(" "), instance);
    }

});


yoimiya.login(token).catch(err => {
    console.log(err);
});

module.exports = yoimiya;


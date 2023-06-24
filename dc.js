const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const yoimiya = require('./src/yoimiya');

const commands = [];
// Grabing all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
};

//regular commands


const reg_cmd = path.join(__dirname, 'src/reg_cmds')
const reg_cmd_folder = fs.readdirSync(reg_cmd);

for (const sub_folder of reg_cmd_folder) {

    const sub_folder_path = path.join(reg_cmd, sub_folder);
    const main_files = fs.readdirSync(sub_folder_path).filter(fk => fk.endsWith('.js'))

    for (const file_path of main_files) {
        const file = path.join(sub_folder_path, file_path)
        const command = require(file);
        yoimiya.commands.set(command.name, command);
    }
}

const rest = new REST().setToken(process.env.token);

// and deployinggg
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.client_id, process.env.guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }

})();
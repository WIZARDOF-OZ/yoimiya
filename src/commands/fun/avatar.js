const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Wanna see your avatar?'),
    async execute(interaction) {
        // code to be written
    }
}
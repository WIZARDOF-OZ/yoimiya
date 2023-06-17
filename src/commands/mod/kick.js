const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick').setDescription('try try'), category: 'mod',
    async execute(interaction) {
        interaction.reply('you have been pranked')
    }

}
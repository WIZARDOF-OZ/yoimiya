const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping').setDescription('try try'), category: 'fun',
    async execute(interaction) {
        interaction.reply('ping in your ass')
    }

}
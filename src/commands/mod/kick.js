const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('try try')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers, PermissionFlagsBits.BanMembers),
    category: 'mod',
    async execute(interaction) {
        interaction.reply('you have been pranked')
    }

}
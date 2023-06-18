const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const yoimiya = require('../../yoimiya');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a member to kick.')
        .addUserOption(option => option.setName('target').setDescription('who is being annoying?').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('and reason').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    category: 'mod',
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') ?? "no reason provided"
        if (member.id === interaction.user.id) return interaction.reply(';-; you cant do that dude');
        const success = new EmbedBuilder()
            .setColor(0x9cff63)
            .setAuthor()
            .setTitle('successfully kicked <:tick:846306021663703070>')
            .addFields(
                { name: "user", value: `<@${member.id}>`, inline: false },
                { name: "reason", value: reason, inline: false }
            )
            .setTimestamp()

        try {
            await interaction.guild.members.kick(member);
            await interaction.reply({ embeds: [success] });
            await member.send({ embeds: [success] });
        } catch (error) {
            console.log(error)
            await interaction.reply('sorry, ;( i guess some error appeared')
        }
    },
};
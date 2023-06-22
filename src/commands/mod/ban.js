const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a member to ban.')
        .addUserOption(option => option.setName('target').setDescription('who is being annoying?').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('and reason').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    category: 'mod',
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') ?? "no reason provided"
        if (member.id === interaction.user.id) return interaction.reply(';-; you cant do that dude');
        const success = new EmbedBuilder()
            .setColor(0xf7aa52)
            .setDescription(`<:p_dot:837257989563744256> User: <@${member.id}> was ban from the server successfully\n\n <:p_dot:837257989563744256> Reason: \`\`${reason}\`\``)
        // .addFields(
        //     { name: "user", value: `<@${member.id}>`, inline: false },
        //     { name: "reason", value: reason, inline: false }
        // )

        const DMembed = new EmbedBuilder()
            .setColor(0xf7aa52)
            .setDescription(`<:p_dot:837257989563744256> you have been  ban from the ${interaction.guild.name} server\n\n <:p_dot:837257989563744256> Reason: \`\`${reason}\`\``)
        try {
            await interaction.guild.members.ban(member);
            await interaction.reply({ embeds: [success] });
            await member.send({ embeds: [DMembed] });
        } catch (error) {
            console.log(error)
            await interaction.reply(`\`\`\`js\n${error}\`\`\``)
        }
    },
};
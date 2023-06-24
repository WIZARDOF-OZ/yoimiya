const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Provides information about the user.'),
    category: 'utility',
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        const Userinfo = new EmbedBuilder()
            .setDescription(`User joined: ${interaction.member.joinedAt} \n Joined discord: ${interaction.member.user.createdAt}`)
            .setFooter({ text: `Command was used by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor(0xf7aa52)
            .setAuthor({ iconURL: interaction.user.displayAvatarURL({ dynamic: true }), name: interaction.user.tag })
        // await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
        await interaction.reply({ embeds: [Userinfo] });
    },
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder().setName('addroles').setDescription('R O L E S')
        .addSubcommand(sb => sb.setName('all').setDescription("all roles in serer"))
        .addSubcommand(sb => sb.setName('members').setDescription('all members with this given roles')
            .addRoleOption(op => op.setName('role').setDescription('menton a role to get members assigned with it').setRequired(true))
        )
        .addSubcommand(sb => sb.setName('user_roles').setDescription("a user's roles")
            .addUserOption(op => op.setName('user').setDescription('whose roles do you want?').setRequired(true))
        )
    , category: 'utility',
    async execute(interaction) {
        const emm = async (roles) => {
            const roleNames = await roles.map((role) => `<@&${role.id}>`).join('\n');
            const roleEmbed = new EmbedBuilder()
                .setColor(0xffe736)
                .setTitle(`Total Roles [${roles.size}]`)
                .setDescription(roleNames)
            await interaction.reply({ embeds: [roleEmbed] });
        }
        if (interaction.options.getSubcommand() === 'all') {
            const member = await interaction.guild.members.fetch(interaction.user.id);
            const roles = await member.guild.roles.cache
            await emm(roles);
        }
        else if (interaction.options.getSubcommand() === 'user_roles') {
            const user = await interaction.options.getMember('user');
            const target = await interaction.guild.members.fetch(user.id)
            const targetRoles = await target.roles.cache;
            await emm(targetRoles);
        }
        else if (interaction.options.getSubcommand() === 'members') {
            const receivedRole = interaction.options.getRole('role')
            const membersWithRole = interaction.guild.members.cache.filter((member) =>
                member.roles.cache.has(receivedRole.id)
            );
            const fMembers = await membersWithRole.map((member) => `<@${member.id}>`).join('\n');
            const eme = new EmbedBuilder()
                .setColor(0xff3030)
                .setTitle(`Total members [${membersWithRole.size}]`)
                .setDescription(fMembers)
            await interaction.reply({ embeds: [eme] });

        }
    },
};
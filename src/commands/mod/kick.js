const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('try try')
        .addUserOption((option) => option.setName('user').setDescription("Select a user to kick").setRequired(true))
        .addStringOption((option) => option.setName('reason').setDescription("Give a reason why to kick the user")
        ),
    category: 'mod',

    // actual code goes here
    async execute(interaction, yoimiya) {
        const persmission = interaction.member.permissions.has(PermissionFlagsBits.KickMembers)
        let user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason') || `Reason was not provided by ${interaction.user}`;

        if (!persmission) {
            await interaction.reply({
                content: "<:crooss:846305904567517184> You dont have the ** required permission** to use this command",

            })
        } else if (user.id === interaction.user.id) {
            await interaction.reply({
                content: "<:crooss:846305904567517184> You cannot **Kick** yourself",
            })
        } else if (user.id === yoimiya.user.id) {
            await interaction.reply({
                content: "<:crooss:846305904567517184> You can't kick me with my own commands"
            })
        } else {
            let member = interaction.guild.membes.cache.get(user.id)
            await member.kick(reason)
                .then(async () => {
                    const KickEmbed = new EmbedBuilder()
                        .setColor('Green')
                        .setDescription(`User Kicked :- ${user} \n Kicked by :- ${interaction.user}\n Reason :- ${reason} `)
                    await interaction.reply({
                        embeds: [KickEmbed]
                    })
                })
            // .catch(async (err) => {
            //     console.log(err)
            //     await interaction.reply({
            //         content: "There was an error executing this command",
            //         ephemeral: false
            //     })
            // })
        }
    }
};
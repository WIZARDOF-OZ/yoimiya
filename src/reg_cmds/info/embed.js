const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "embed",
    category: "info",
    description: 'embed',

    execute: (message, args) => {
        try {
            const embed = new EmbedBuilder()

                // .setTitle(`Embed`)

                .setColor(0xfa9e48)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(message.content.substring(7))
                // .setFooter(`REQUESTED BY ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                .setFooter({ text: `requested by ${message.author.tag}` })
                .setTimestamp();
            message.channel.send({ embeds: [embed] })
        } catch (error) {
            message.reply(`${error.message}`)
            console.log(error)
        }
    }
}
const { Client, Message, EmbedBuilder } = require("discord.js");
const { emoji, color } = require("../../config");

module.exports = {
    name: "say",
    category: "fun",
    cooldown: 2,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: (message, args) => {
        try {
            const errEmbed = new EmbedBuilder()
                .setColor(color.error)
                .setDescription(`${emoji.error}Please provide some text`)
            if (!args[0]) return message.channel.send({ embeds: [errEmbed] })
            // const sayEmbed = new EmbedBuilder()
            //     .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dyanmic: true }) })
            //     .setDescription(args.join(" "))
            //     .setColor(0xf7aa52)
            //     .setTimestamp()
            // message.channel.send({ embeds: [sayEmbed] })
            message.replys(args.join(" "))
        } catch (err) {
            message.channel.send(err.stack)
        }
    }
};
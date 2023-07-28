const Discord = require('discord.js')
const fs = require("fs");
const { prefix } = require('../../config.js');
const { stripIndents } = require("common-tags");


module.exports = {
    name: 'help',
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['h'],

    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} message 
     */
    execute: async (bot, message, args) => {
        const Description = `My Prefix For **${message.guild}** Is **${prefix}**\n\nFor More Command Information, Type The Following Command:\n**${prefix}help <command Name> or** @yoimiya **help <command name>**`;

        const Embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(Description)
            .addFields({
                name: "ping", value: "Will return the ping of the bot",
                name: "say", value: "The bot will say the following words you gave it to her",
                name: "ban", value: "Use to ban peoples in the user who cross their limits",
                name: "kick", value: "Use to kick user out from the server",
                name: "lock", value: "Use to lock a channel",
                name: "unlock", value: "Use to unlock a channel",
                name: "slowmode", value: "Use to add cooldown to a particular channel",
                name: "avatar", value: "Can be use to see/check a particular user  avatar",
                name: "userinfo", value: "Can be use to check a particular use profile",
            })
            // .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: bot.user.displayAvatarURL() })
            .setTimestamp();

        message.channel.send({ embeds: [Embed] });



        /*    try {
    
                // let Categories = ["fun", "info", "mod", "utility"],
                //     AllCommands = [];
    
                // const Emotes = {
    
                //     fun: "🙂 Fun",
                //     info: "📚 Info",
                //     mod: "🔧 Mod",
                //     utility: "🤖 Utility"
                // };
    
                // for (let i = 0; i < Categories.length; i++) {
                //     const Cmds = await bot.commands.filter(C => C.category === Categories[i]).array().map(C => C.name).sort((a, b) => a < b ? -1 : 1).join(", ");
                //     AllCommands.push(`\n\n**${Emotes[Categories[i]]}**\n\`\`\`${Cmds}\`\`\``);
                // };
    
    
                else {
                    const embed = new Discord.EmbedBuilder()
                        .setColor("RANDOM")
                        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
                        .setThumbnail(bot.user.displayAvatarURL())
    
                    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
                    if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
                    command = command.config
    
                    embed.setDescription(stripIndents`
        ** Command -** \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`\n
        ** Description -** \`${command.description || "No Description provided."}\`\n
        ** Usage -** [   \`${command.usage ? `${command.usage}` : "No Usage"}\`   ]\n
        ** Examples -** \`${command.example ? `${command.example}` : "No Examples Found"}\`\n
        ** Aliases -** [ \`${command.aliases ? command.aliases.join(" , ") : "None."}\` ]`)
                    embed.setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
    
                    return message.channel.send({ embeds: [embed] })
                };
            } catch (e) {
                console.log(e);
            };
    
    */

    }

}
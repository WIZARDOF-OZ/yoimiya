const { EmbedBuilder, Message, PermissionsBitField, Guild } = require('discord.js');
const config = require('../../config');



// module.exports = {
//     name: "lock",
//     aliases: ['channellock', 'chanlck'],
//     memberPermissions: ['ManageChannels'],
//     category: 'mod',
//     description: "Use to lock a channel",
//     /**
//      *
//      * @param {Client} client
//      * @param {Message} message
//      * @param {String[]} args
//      * @param {Guild} guild
//      */

//     execute: async (client, message, args, guild, instance) => {
//         try {

//             const errEmbed = new EmbedBuilder();
//             let reason = args.slice(1).join(" ") ?? 'No reason provided';

//             // if(!message.member.permissions.has('MANAGE_CHANNELS')) return channel.send(errEmbed.setDescription(`${instance.emoji.error} You Don't Have Perms To Use This Command`));

//             let channeltolock = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);

//             if (!channeltolock) return message.reply(`${config.emoji.error} Please Select One Channel To Lock`);

//             let everyone = message.guild.roles.cache.get(message.guild.id);
//             const lockembed = new EmbedBuilder()
//                 .setTitle('Channel Locked Successfuly')
//                 .setDescription(`Locked Channel: ${channeltolock} \n\n Reason: ${reason}`)
//                 .setColor('RANDOM')
//                 .setFooter({ text: 'Command used by a staff member', iconURL: message.guild.iconURL() })
//                 .setTimestamp();
//             // channeltolock.updateOverwrite(everyone, {

//             //     SEND_MESSAGES: false,
//             //     ADD_REACTION: false,


//             // }, [`REPONSIBLE MODERATOR | ${message.author.tag}`])
//             // .then(message.reply({ embeds: [lockembed] }))
//             // .catch(console.error)
//             channeltolock.permissionOverwrites.edit(guild.id, { ViewChannel: false, SendMessages: false }), [`RESPONSIBLE MODERATOR | ${message.author.tag}`].then(message.reply({ embeds: [lockembed] }))

//         } catch (error) {
//             // message.reply(error);
//             console.log(error)
//         }
//     },
// };
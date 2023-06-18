const { Events, Message } = require('discord.js');
const yoimiya = require('../yoimiya')
module.exports = {
    name: Events.MessageCreate,
    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
        if (message.author.bot) return;
        if (message.content === 'ping') {
            message.reply('pong')
        } else if (message.content === 'hey') {
            message.reply(`${message.author} Hey there, My name is Yoimiya and Im a custom bot for this server made by AKi and Wizard`)
        } else if (message.content === 'hmmm') {
            message.reply('hmmmm')
        } else if (message.content === 'simp') {
            message.channel.send('yes, I know you are my simp <3');
        }
    },
};
const { Events, Message } = require('discord.js');

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
        }
    },
};
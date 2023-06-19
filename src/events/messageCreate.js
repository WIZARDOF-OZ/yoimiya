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
        const args = message.content.toLocaleLowerCase().trim().split(/ +/);
        const command = args.shift();
        switch (command) {
            case 'rui':
            case 'akarui':
            case 'ali': try {
                message.channel.send('**u hear a sound from no where saying:** \n **even if im not here,  fireworks gonna light ur path**\n ||<@1043111564582060052>||')
            } catch (err) {
                console.log(err)
            }
                break;
            case 'hey':
                message.reply('Heya')
                break;
            case 'simp':
                message.reply('I know you simp for me :3')
        }
        if (message.content.startsWith('_yaoi')) {
            const msg = message.content.slice(5);
            if (!msg) return;
            message.delete().catch(err => console.log(err));
            message.channel.send(msg).catch(err => console.log(err));
        }
    },
};
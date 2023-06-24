const { ActivityType } = require("discord.js")

module.exports = {
    name: 'ready',
    once: true,
    execute(yoimiya) {

        console.log('bot is alive')


        yoimiya.user.setStatus('idle');
        yoimiya.user.setActivity(`Under Developement`, ActivityType.Watching)
        // const channel = yoimiya.channels.cache.get('1119346920058531931');
        // channel.send('<@952975852801523762> <@583666642010112000> Yoimiya is online');

    },
};
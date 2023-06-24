module.exports = {
    name: 'ping',
    description: 'pong',
    execute: (message, args) => {
        message.reply(`pong ` + ' ' + args)
    }
}
module.exports = {
    name: 'pong',
    description: 'pong',
    execute: (message, args) => {
        message.reply(`pong ` + args)
    }
}
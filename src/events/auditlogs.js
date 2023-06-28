const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
/**
 * @param {auditLog} auditLog
 */
module.exports = {
    name: Events.GuildAuditLogEntryCreate,
    on: true,
    async execute(auditLog) {

        const { action, executorId, targetId, extra: channel } = auditLog;
        const logEmbed = new EmbedBuilder()
            .setTitle(`Logs of audit`)
            .setTimestamp()
            .setColor(0xf7aa52)
            .setImage()
            .addFields([
                { name: 'bla bla', value: 'blah' },
                { name: 'bla bla', value: 'blah' },
                { name: 'bla bla', value: 'blah' },
            ])

        console.log(action, executorId, targetId, channel)
    }
}
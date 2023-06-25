const { Events, AuditLogEvent } = require('discord.js')
/**
 * @param {auditLog} auditLog
 */
module.exports = {
    name: Events.GuildAuditLogEntryCreate,
    on: true,
    async execute(auditLog) {
        const { action, executorId, targetId, extra: channel } = auditLog;

        console.log(action, executorId, targetId, channel)
    }
}
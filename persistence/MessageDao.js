var conversation = [];

function MessageDao(connection) {
    this._connection = connection;
}

MessageDao.prototype.save = function (message, callback) {
    this._connection.query('INSERT INTO messages SET ?', message, callback);
}

MessageDao.prototype.findById = function (id, callback) {
    this._connection.query("select * from messages where messageId = ?", [id], callback);
}

MessageDao.prototype.conversation = function (id) {

    this._connection.query({
        sql: 'SELECT * FROM `messages` WHERE `conversationId` = ?',
        timeout: 40000, // 40s
        values: [id]
    });
}

processRow = function (row) {
    conversation.push(row);
}

MessageDao.prototype.findByConversationId = function (id) {
    return new Promise((resolve, reject) => {
        resolve(this._connection.query("select msg.messageId, msg.date, msg.interaction, msg.bot, msg.botId, msg.conversationId from messages msg where msg.conversationId = ? order by msg.date", [id]));
    });
}
module.exports = function () {
    return MessageDao;
};

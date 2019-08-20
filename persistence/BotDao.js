var list = [];

function BotDao(connection) {
    this._connection = connection;
}

BotDao.prototype.save = function (bot, callback) {
    this._connection.query('INSERT INTO bots SET ?', bot, callback);
}

BotDao.prototype.list = function (req, res) {
    var query = this._connection.query({
        sql: 'SELECT * FROM bots order by date desc, botId desc',
        timeout: 40000
    });

    query
        .on('error', function (err) {
            res.status(500).send(err);
        })
        .on('fields', function (fields) {
            return fields
        })
        .on('result', function (row) {
            this._connection.pause();

            processRow(row, function () {
            });
            this._connection.resume();
        })
        .on('end', function () {
            res.status(200).send(list);
        }
        )
}

processRow = function (row) {
    list.push(row);
}

BotDao.prototype.buscaPorId = function (id, callback) {
    this._connection.query("select * from bots where id = ?", [id], callback);
}

module.exports = function () {
    return BotDao;
};

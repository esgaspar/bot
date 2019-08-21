'use strict';
module.exports = function (app) {
    var bots = require('../controllers/botController');
    // bots Routes
    app.route('/bots')
        .post(bots.create_a_bot)
        .get(bots.list_all_bots);
    app.route('/bots/:id')
        .get(bots.read_a_bot)
        .put(bots.update_a_bot)
        .delete(bots.delete_a_bot);
};
'use strict';
module.exports = function (app) {
    var messages = require('../controllers/msgController');
    // messages Routes
    app.route('/messages')
    .post(messages.create_a_message);
    app.route('/messages/:id')
    .get(messages.read_a_message)
    app.route('/messages/conversation/:conversationid')
    .get(messages.find_conversation);
    
    var bots = require('../controllers/botController');
    // bots Routes
    app.route('/bots')
        .post(bots.create_a_bot)
        .get(bots.list_all_bots);
    app.route('/bot/:id')
        .get(bots.read_a_bot)
        .put(bots.update_a_bot)
        .delete(bots.delete_a_bot);
};
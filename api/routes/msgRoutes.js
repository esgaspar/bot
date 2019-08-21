'use strict';
module.exports = function (app) {
    var messages = require('../controllers/msgController');
    // messages Routes
    app.route('/messages')
        .post(messages.create_a_message);
    app.route('/messages/:id')
        .post(messages.read_a_message)
    app.route('/messages/:conversationId')
        .get(messages.find_conversation);

};
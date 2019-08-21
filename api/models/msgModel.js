'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var msgSchema = new Schema({
    to: {
        type: String
    },
    from: {
        type: String
    },
    conversationId: {
        type: String
    },
    text: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Messages', msgSchema);
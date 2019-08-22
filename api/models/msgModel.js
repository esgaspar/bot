'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var msgSchema = new Schema({

    conversationId: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    text: {
        type: String
    }
});
module.exports = mongoose.model('Messages', msgSchema);
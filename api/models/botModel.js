'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var botSchema = new Schema({
    name: {
        type: String
    }
});
module.exports = mongoose.model('Bots', botSchema);
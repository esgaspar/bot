'use strict';
var mongoose = require('mongoose'),
    Message = mongoose.model('Messages');
exports.list_all_messages = function (req, res) {
    Message.find({}, function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.find_conversation = function (req, res) {
    Message.find({ conversationId: req.params.conversationId }, function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.create_a_message = function (req, res) {
    var new_msg = new Message(req.body);
    new_msg.save(function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.read_a_message = function (req, res) {
    Message.findById(req.params.id, function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.update_a_message = function (req, res) {
    Message.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.delete_a_message = function (req, res) {
    Message.remove({
        _id: req.params.id
    }, function (err, msg) {
        if (err)
            res.send(err);
        res.json({ message: 'Message successfully deleted' });
    });
};
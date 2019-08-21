'use strict';
var mongoose = require('mongoose'),
    Bot = mongoose.model('Bots');
exports.list_all_bots = function (req, res) {
    Bot.find({}, function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.create_a_bot = function (req, res) {
    var new_bot = new Bot(req.body);
    new_bot.save(function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.read_a_bot = function (req, res) {
    Bot.findById(req.params.id, function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.update_a_bot = function (req, res) {
    Bot.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, msg) {
        if (err)
            res.send(err);
        res.json(msg);
    });
};
exports.delete_a_bot = function (req, res) {
    Bot.remove({
        _id: req.params.id
    }, function (err, msg) {
        if (err)
            res.send(err);
        res.json({ bot: 'Bot successfully deleted' });
    });
};
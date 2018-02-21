const mongoose = require('mongoose');

const logs = mongoose.Schema({
    message: String,
    date: String
},{versionKey: false});
exports.Log = mongoose.model('logs',logs);
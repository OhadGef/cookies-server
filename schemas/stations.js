const mongoose = require('mongoose')

const stationsSchema = mongoose.Schema({
    focus: Boolean,
    id: String,
    name: String,
    coffee: Number,
    cookies: Number,
    actionType: String,
    entity:
        {
            id: String,
            name: String,
            color: String,
            position: String
        }
},{versionKey: false});
exports.Station = mongoose.model('stations', stationsSchema);
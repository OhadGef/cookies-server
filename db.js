var uri = 'mongodb://test:test@ds243008.mlab.com:43008/cookies';

var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('db connected..')
});



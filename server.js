const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const Station = require('./schemas/stations').Station;
const Log = require('./schemas/logs').Log;

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});

app.get('/', (req, res) => {
    Station.find({},{'_id': 0}, (err, station) => {
        console.log('Get all stations');
        res.json(station);
    })
});

app.get('/sum', (req,res) =>{
    Log.aggregate(
        [
            { "$group":
                    { "_id": "$message",
                        count:{$sum: 1}}}
        ],  function(err, results) {
            res.send(JSON.stringify(results));
        })

})

app.post('/new', (req,res) => {
    console.log('**************');
    let newStation = new Station(req.body);
    newStation.save( (err, st)=> {
        console.log(`There is a new station named: ${st.name}`)
        res.send(st)
    })
});

app.get('/error/:username', function (req, res) {
    res.status(404).send('No user named ' + req.params.station + ' found')
})

const stationRouter = require('./route/stations');
app.use('/st/:stations', stationRouter);

const logsRouter = require('./route/logs');
app.use('/:logs', logsRouter);


const server = app.listen(PORT, () => {
    console.log(`The server is running in port ${server.address().port}..`)
})
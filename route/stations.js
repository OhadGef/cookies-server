const express = require('express');
const Station = require('../schemas/stations').Station;

const router = express.Router({
    mergeParams: true
});

router.use((req, res, next) => {
    console.log(req.method, 'for', req.params.station, 'at', req.path);
    next()
});

router.get('/', (req, res) => {
    const stationName = req.params.stations;
    Station.findOne({id: stationName}, (err, user) => {
        let newData = {
            focus: user.focus,
            id: user.id,
            name: user.name,
            coffee: user.coffee,
            cookies: user.cookies,
            actionType: user.actionType,
            entity: {
                id: user.entity.id,
                name: user.entity.name,
                color: user.entity.color,
                position: user.entity.position
            }
        };
        console.log(`Get station ${newData.name}`);
        res.json(newData);
    });
});

router.put('/', (req, res) => {
    const stationName = req.params.stations;
    Station.findOneAndUpdate({name: stationName}, {
        id: req.body.id,
        name: req.body.name,
        coffee: req.body.coffee,
        cookies: req.body.cookies
    }, (err, st) => {
        console.log(`Station ${st.name} was changed`);
        res.send(st);
    })
});

router.delete('/', (req, res) => {
    const stationName = req.params.stations;
    Station.remove({name: stationName}, (err) => {
        console.log(`${stationName} was Deleted `);
        res.end();
    })
});

module.exports = router;
const express = require('express');
const Log = require('../schemas/logs').Log;


var router = express.Router({
    mergeParams: true
});

router.use((req, res, next) => {
    console.log(req.method, 'for', req.params, 'at', req.path)
    next()
});

router.get('/', (req,res) =>{
   Log.find({},{'_id': 0}, (err, logs) => {
       if(err){
           console.error(err)
       }else {
           console.log('Get all logs');
           console.log( typeof logs);
           res.send(JSON.stringify(logs));
       }
   })
});

router.post('/',(req,res) => {
    let newLog = new Log(req.body);
    newLog.save( (err, msg)=> {
        if(err){
            console.error(err)
        } else {
            console.log(`LOG: ${msg.message}`)
            res.send({'ms':'Create success'});
        }
    })
});

router.delete('/', (req,res) => {
    Log.remove({},(err) => {
        if(err){
            console.error(err)
        } else {
            res.end("Delete success");
        }
    })
})

module.exports = router;
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
   Log.find({}, (err, log) => {
       if(err){
           console.error(err)
       }else {
           console.log('Get all stations');
           res.json(log);
       }
   })
});

router.post('/',(req,res) => {
    console.log('Log Message');
    let newLog = new Log(req.body);
    newLog.save( (err, msg)=> {
        if(err){
            console.error(err)
        } else {
            console.log(`LOG: ${msg.message}`)
            res.end();
        }
    })
});

router.delete('/', (req,res) => {
    Log.remove({},(err) => {
        if(err){
            console.error(err)
        } else {
            res.end("success");
        }
    })
})

module.exports = router;
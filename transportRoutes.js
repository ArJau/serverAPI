const express = require('express');
const apiRouter = express.Router();
var modelRepo = require('./model');

var PersistentModel;
//var mongoose = require('mongoose');

await modelRepo.initModels();
let map = modelRepo.mapModel();

apiRouter.route('/transport-api/public/lstStops')
.get( function(req , res  , next ) {
    var criteria = {idPosition: req.query.idPosition};
    PersistentModel = map.get("stops");
    PersistentModel.find(criteria, function(err, lstStops){
        if(err){
            console.log("err: " + err);
        }
        console.log(lstStops);
        res.send(lstStops);
    });
    
   
});

exports.apiRouter = apiRouter;
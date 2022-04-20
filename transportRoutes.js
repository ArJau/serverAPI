const express = require('express');
const apiRouter = express.Router();
var modelRepo = require('./model');

var PersistentModel;
var mapModel;
modelRepo.initModels( function(model){
    mapModel  = model;
});

apiRouter.route('/transport-api/public/lstStops')
.get( function(req , res  , next ) {
    if (req.query.idPosition){
        var criteria = {"idPosition": req.query.idPosition};
       
        PersistentModel = mapModel.get("stops");
        PersistentModel.find(criteria, function(err, lstStops){
            if(err){
                console.log("err: " + err);
            }
            res.send(filtreStops(lstStops));
        });
    }else{
        res.status(404);
        console.log("err: " + err);
    }
});

apiRouter.route('/transport-api/public/lstStopsTrajet')
.get( function(req , res  , next ) {
    if (req.query.idPosition){
        var criteria = {"idPosition.pos": req.query.idPosition};
       
        PersistentModel = mapModel.get("trajets");
        PersistentModel.find(criteria, function(err, lstTrajets){
            if(err){
                console.log("err: " + err);
            }
            res.send(lstTrajets);
        });
    }else{
        res.status(404);
        console.log("err: " + err);
    }
});

class Vehicle{
    routeId;
    coord = [];
}
apiRouter.route('/transport-api/public/realtimesvehicles/:idReseau')
.get( function(req , res  , next ) {
    var criteria = {"idReseau": req.params.idReseau};
    lstVehiclesOpti = {};
    PersistentModel = mapModel.get("realtimesvehicles");
    PersistentModel.find(criteria, function(err, lstVehicles){
        if(err){
            console.log("err: " + err);
        }

        for (let vehicle in lstVehicles){
            let v = new Vehicle();
            v = vehicle.vehicle.routeId;
            v.coord.push(vehicle.vehicle.position.latitude);
            v.coord.push(vehicle.vehicle.position.longitude);
            lstVehiclesOpti.push(v);
        }
        res.send(lstVehiclesOpti);
    });
});

apiRouter.route('/transport-api/public/shapes/:idReseau')
.get( function(req , res  , next ) {
    var criteria = {"id": req.params.idReseau};
    PersistentModel = mapModel.get("shapes");
    PersistentModel.find(criteria, function(err, lstShapes){
        if(err){
            console.log("err: " + err);
        }
        res.send(lstShapes);
    });
});

class stopFiltre{
    id;
    name;
    coord = [];
}

function filtreStops(lstStops){
    let map = new Map();
    let stopF;
    let stop;
    for (let i in lstStops){
        stop = lstStops[i];
        if (!map.get(stop.stop_name)){
            stopF = new stopFiltre();
            stopF.id = stop.id;
            stopF.name = stop.stop_name;
            map.set(stop.stop_name, stopF);
        }
        map.get(stop.stop_name).coord.push({lon:stop.stop_lon, lat:stop.stop_lat});
        
    }
    return Array.from(map.values());
}

exports.apiRouter = apiRouter;
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
    bearing;
    tripId;
}

apiRouter.route('/transport-api/public/lstDescriptionReseau')
.get( function(req , res  , next ) {
    PersistentModel = mapModel.get("reseau-descs");
    var criteria = {};
    PersistentModel.find(criteria, function(err, descriptionReseau){
        if(err){
            console.log("err: " + err);
        }
        res.send(descriptionReseau);
    });
});

apiRouter.route('/transport-api/public/realtimesvehicles/:idReseau')
.get( function(req , res  , next ) {
    var criteria = {"idReseau": req.params.idReseau};
    console.log(criteria);
    lstVehiclesOpti = [];
    PersistentModel = mapModel.get("realtimesvehicles");
    PersistentModel.find(criteria, function(err, lstVehicles){
        if(err){
            console.log("err: " + err);
        }
        console.log(JSON.stringify(lstVehicles));
        for (let v in lstVehicles){
            let vehicle = new Vehicle();
            if (lstVehicles[v].vehicle){
                vehicle.coord.push(lstVehicles[v].vehicle.position.latitude);
                vehicle.coord.push(lstVehicles[v].vehicle.position.longitude);
                vehicle.bearing = lstVehicles[v].vehicle.position.bearing;
                vehicle.tripId = lstVehicles[v].vehicle.trip.tripId;
                vehicle.routeId = lstVehicles[v].vehicle.trip.routeId;
                lstVehiclesOpti.push(vehicle);
            }
        }
        console.log("nb lstVehicles : " + lstVehicles.length);
        console.log("nb lstVehiclesOpti : " + lstVehiclesOpti.length);
        res.send(lstVehiclesOpti);
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
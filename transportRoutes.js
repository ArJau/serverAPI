const express = require('express');
const apiRouter = express.Router();
var modelRepo = require('./model');

var PersistentModel;
var mapModel;
modelRepo.initModels( function(model){
    mapModel  = model;
});

apiRouter.route('/test')
.get( function(req , res  , next ) { 
    res.send("Ca marche");
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

apiRouter.route('/transport-api/public/lstStopsTrajetIdPositionIdReseau')
.get( function(req , res  , next ) {
    if (req.query.idPosition){
        var criteria = {"idPosition.pos": req.query.idPosition, 
        "id": req.query.idReseau};
       
        PersistentModel = mapModel.get("trajets");
        PersistentModel.find(criteria, function(err, lstTrajets){
            if(err){
                console.log("err: " + err);
            }
            //console.log(lstTrajets);
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
    id;
}

class Alert{
    text;
    routeId;
    start;
    end;
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
        //console.log(JSON.stringify(lstVehicles));
        for (let v in lstVehicles){
            let vehicle = new Vehicle();
            vehicle.coord.push(lstVehicles[v].vehicle.position.latitude);
            vehicle.coord.push(lstVehicles[v].vehicle.position.longitude);
            vehicle.bearing = lstVehicles[v].vehicle.position.bearing;
            vehicle.id = lstVehicles[v].vehicle.vehicle.id;
            if (lstVehicles[v].vehicle.trip){
                vehicle.tripId = lstVehicles[v].vehicle.trip.tripId;
                vehicle.routeId = lstVehicles[v].vehicle.trip.routeId;
            }
            lstVehiclesOpti.push(vehicle);
        }
        res.send(lstVehiclesOpti);
    });
});

apiRouter.route('/transport-api/public/realtimesalerts/:idReseau')
.get( function(req , res  , next ) {
    var criteria = {"idReseau": req.params.idReseau};
    console.log(criteria);
    lstAlertsOpti = [];
    PersistentModel = mapModel.get("realTimesAlerts");
    PersistentModel.find(criteria, function(err, lstAlerts){
        if(err){
            console.log("err: " + err);
        }
        //console.log(JSON.stringify(lstAlerts));
        /*for (let a in lstAlert){
            let alert = new Alert();
            alert.text = lstAlert[a].alert.descriptionText.translation[0].text;
            alert.routeId = lstAlert[a].alert.informedEntity
            lstAlertsOpti.push(alert);
        }*/
        res.send(lstAlerts);
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
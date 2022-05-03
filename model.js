const repo = require('./dao/repo');
var connectionDb = require('./connectionDb');

var mapM = new Map();//nom du model => model persistant mongo
var mapF = new Map();//map nom du fichier => nom du model
var dbName = "TransportHoraire";


async function initModels(callBackFuntion){
   var db = await connectionDb.initDb(dbName);
   let circuit = {
        
    "_id": {
        "primaryKey": true,
        "type": "Object",
        "required": true
    },
    "aom": {
        "type": "Object",
        "structure": {
            "name": {
                "key": true,
                "type": "undefined",
                "required": false
            },
            "siren": {
                "type": "string",
                "required": true
            }
        },
        "required": true
    },
    "community_resources": {
        "type": "Array",
        "required": true
    },
    "covered_area": {
        "type": "Object",
        "structure": {
            "name": {
                "key": true,
                "type": "string",
                "required": true
            },
            "region": {
                "type": "Object",
                "structure": {
                    "name": {
                        "type": "string",
                        "required": true
                    }
                },
                "required": true
            },
            "aom": {
                "type": "Object",
                "structure": {
                    "name": {
                        "key": true,
                        "type": "string",
                        "required": true
                    },
                    "siren": {
                        "type": "string",
                        "required": true
                    }
                },
                "required": true
            },
            "cities": {
                "type": "Array",
                "required": true
            },
            "type": {
                "type": "string",
                "required": true
            },
            "country": {
                "type": "Object",
                "structure": {
                    "name": {
                        "type": "string",
                        "required": true
                    }
                },
                "required": true
            }
        },
        "required": true
    },
    "created_at": {
        "type": "string",
        "required": true
    },
    "datagouv_id": {
        "key": true,
        "type": "string",
        "required": true
    },
    "id": {
        "key": true,
        "type": "string",
        "required": true
    },
    "page_url": {
        "type": "string",
        "required": true
    },
    "publisher": {
        "type": "Object",
        "structure": {
            "name": {
                "type": "string",
                "required": true
            },
            "type": {
                "key": true,
                "type": "string",
                "required": true
            }
        },
        "required": true
    },
    "resources": {
        "type": "Array",
        "required": true
    },
    "slug": {
        "key": true,
        "type": "string",
        "required": true
    },
    "title": {
        "key": true,
        "type": "string",
        "required": true
    },
    "type": {
        "key": true,
        "type": "string",
        "required": true
    },
    "updated": {
        "type": "string",
        "required": true
    }

};
    repoInit(db, 'circuits', circuit);

    let agency = {
        id : {"type": "string"},
        agency_id: {"type": "string"},
        agency_name : {"type": "string"},
        agency_url : {"type": "string"},
        agency_timezone : {"type": "string"},
        agency_phone : {"type": "string"},
        agency_lang : {"type": "string"},
        id : {"type": "string"}
    };
    repoInit(db, 'agencies', agency);


    let stops = {
        id : {"type": "string"},
        stop_id: {"type": "string"},
        level_id : {"type": "string"},
        stop_name : {"type": "string"},
        stop_lat : {"type": "string"},
        stop_lon : {"type": "string"},
        location_type : {"type": "string"},
        parent_station : {"type": "string"},
        idPosition:{"type": "string"}
    };
    repoInit(db, 'stops', stops);
 

    let routes = {
        route_id: {"type": "string"},
        route_short_name : {"type": "string"},
        route_long_name : {"type": "string"},
        route_desc : {"type": "string"},
        route_type : {"type": "string"},
        route_url: {"type": "string"},
        route_color: {"type": "string"},
        route_text_color: {"type": "string"},
        id : {"type": "string"}
    };
    repoInit(db, 'routes', routes);

    let trips = {
        id : {"type": "string"},
        route_id: {"type": "string"},
        service_id : {"type": "string"},
        trip_id : {"type": "string"},
        trip_headsign : {"type": "string"},
        block_id : {"type": "string"}
    };
    repoInit(db, 'trips', trips)
        

    let stop_times = {
        id : {"type": "string"},
        trip_id: {"type": "string"},
        arrival_time : {"type": "string"},
        departure_time : {"type": "string"},
        stop_id : {"type": "string"},
        stop_sequence : {"type": "string"},
        pickup_type : {"type": "string"},
        drop_off_type : {"type": "string"}
    };
    repoInit(db, 'stop_times', stop_times)
    

    let calendar = {
        id : {"type": "string"},
        service_id: {"type": "string"},
        monday : {"type": "string"},
        tuesday : {"type": "string"},
        wednesday : {"type": "string"},
        thursday : {"type": "string"},
        friday : {"type": "string"},
        saturday : {"type": "string"},
        sunday : {"type": "string"},
        start_date : {"type": "string"},
        end_date : {"type": "string"}
    };
    repoInit(db, 'calendars', calendar)
    

    let calendar_dates = {
        id : {"type": "string"},
        service_id: {"type": "string"},
        date : {"type": "string"},
        exception_type : {"type": "string"}
    };
    repoInit(db, 'calendar_dates', calendar_dates);


    let fare_attributes = {
        id : {"type": "string"},
        fare_id: {"type": "string"},
        price : {"type": "string"},
        currency_type : {"type": "string"},
        payment_method : {"type": "string"},
        transfers : {"type": "string"},
        transfer_duration : {"type": "string"}
    };
    repoInit(db, 'fare_attributes', fare_attributes);


    let fare_rules = {
        id : {"type": "string"},
        fare_id: {"type": "string"},
        route_id : {"type": "string"},
        origin_id : {"type": "string"},
        destination_id : {"type": "string"},
        contains_id : {"type": "string"}
    };
    repoInit(db, 'fare_rules', fare_rules);


    let shapes = {
        id : {"type": "string"},
        shape_id: {"type": "string"},
        shape_pt_lat : {"type": "string"},
        shape_pt_lon : {"type": "string"},
        shape_pt_sequence : {"type": "string"},
        shape_dist_traveled : {"type": "string"}
    };
    repoInit(db, 'shapes', shapes);

    let pathways = {
        pathway_id : {"type": "string"},
        from_stop_id: {"type": "string"},
        to_stop_id : {"type": "string"},
        pathway_mode : {"type": "string"},
        is_bidirectional : {"type": "string"},
        length : {"type": "string"},
        traversal_time : {"type": "string"},
        stair_count : {"type": "string"},
        max_slope : {"type": "string"},
        min_width : {"type": "string"},
        signposted_as : {"type": "string"},
        reversed_signposted_as : {"type": "string"}
    };
    repoInit(db, 'pathways', pathways);


    let frequencies = {
        id : {"type": "string"},
        trip_id: {"type": "string"},
        start_time : {"type": "string"},
        end_time : {"type": "string"},
        headway_secs : {"type": "string"},
        exact_times : {"type": "string"}
    };
    repoInit(db, 'frequencies', frequencies);


    let transfers = {
        id : {"type": "string"},
        from_stop_id: {"type": "string"},
        to_stop_id : {"type": "string"},
        transfer_type : {"type": "string"},
        min_transfer_time : {"type": "string"},
        from_route_id : {"type": "string"},
        to_route_id : {"type": "string"},
        from_trip_id : {"type": "string"},
        to_trip_id : {"type": "string"},
        na : {"type": "string"},
        na : {"type": "string"}
    };
    repoInit(db, 'transfers', transfers);

/*
    let levels = {
    };
    repoInit(dbName, 'levels', levels);*/

/*
    let translations = {
    };
    repoInit(dbName, 'translations', translations);*/

/*
    let attributions = {
    };
    repoInit(dbName, 'attributions', attributions);*/


    let feed_info = {
        id : {"type": "string"},
        feed_publisher_name: {"type": "string"},
        feed_publisher_url : {"type": "string"},
        feed_lang : {"type": "string"},
        feed_id : {"type": "string"}
    };
    repoInit(dbName, 'feed_info', feed_info);

    let trajets = {
        id : {"type": "string"},
        route_id: {"type": "string"},
        route_text_color : {"type": "string"},
        route_color : {"type": "string"},
        route_long_name : {"type": "string"},
        route_short_name : {"type": "string"},
        idPosition : [],
        stops : [],
        shapes : []
    };

    repoInit(db, 'trajets', trajets);

    let descReseau = {
        title: {"type": "string"},
        id: {"type": "string"},
        url: {"type": "string"},
        rt: {"type": "string"},
        nbRoutes: {"type": "string"},
        center: [], 
        display: {"type": "boolean"},
        zoom: {"type": "number"},
    };
    repoInit(db, 'reseau-descs', descReseau);

    let realTimesVehicles = {
        idReseau: {"type": "string"},
        trip: {"type": "Object",
            structure: {
                tripId: {
                    key: true,"type": "string"},
                startDate: {type: "string"},
                scheduleRelationship: {"type": "string"},
                routeId: {"type": "string"}
            }
        },
        position: {"type": "Object",
            structure: {
                latitude: {"type": "number"},
                longitude: {
                    "type": "number"
                },
                bearing: {
                    "type": "number"
                }
            }
        },
        currentStopSequence: {"type": "number"},
        currentStatus: {"type": "string"},
        timestamp: {"type": "string"},
        vehicle: {
            "type": "Object",
            "structure": {
                "id": {
                    "type": "string"
                }
            }
        },
        stopId: {"type": "string"}
    };
    repoInit(db, 'realtimesvehicles', realTimesVehicles);

    realTimesAlerts = {
        "idReseau" : {"type": "string"},
        "alert": {
            "type": "Object",
            "structure": {
                "activePeriod": {
                    "type": "Array"
                },
                "informedEntity": {
                    "type": "Array"
                },
                "cause": {
                    "key": true,
                    "type": "string"
                },
                "effect": {
                    "key": true,
                    "type": "string"
                },
                "url": {
                    "type": "Object",
                    "structure": {
                        "translation": {
                            "type": "Array"
                        }
                    }
                },
                "headerText": {
                    "type": "Object",
                    "structure": {
                        "translation": {
                            "type": "Array"
                        }
                    }
                },
                "descriptionText": {
                    "type": "Object",
                    "structure": {
                        "translation": {
                            "type": "Array"
                        }
                    }
                }
            }
        }
    }
    repoInit(db, 'realTimesAlerts', realTimesAlerts);

    if (callBackFuntion){
        callBackFuntion(mapM);
    }
}

function repoInit(db, nameCollection, schema){
    repo.init(db, nameCollection, schema,
    function(model){
        mapM.set(nameCollection, model);
    });
}
/**
 * Mapping entre le nom du fichier de description et de la collection.
 */
function initMapF(){
    mapF.set('agency.txt', 'agencies');
    mapF.set('stops.txt', 'stops');
    mapF.set('routes.txt', 'routes');
    mapF.set('trips.txt', 'trips');
    mapF.set('stop_times.txt', 'stop_times');
    mapF.set('calendar.txt', 'calendars');
    mapF.set('calendar_dates.txt', 'calendar_dates');
    mapF.set('fare_attributes.txt', 'fare_attributes');
    mapF.set('fare_rules.txt', 'fare_rules');
    mapF.set('shapes.txt', 'shapes');
    mapF.set('pathways.txt', 'pathways');
    mapF.set('frequencies.txt', 'frequencies');
    mapF.set('transfers.txt', 'transfers');
    /*mapF.set('levels.txt', 'levels');
    mapF.set('translations.txt', 'translations');
    mapF.set('attributions.txt', 'attributions');*/
}

function mapModel(){
    return mapM;
}

function mapFichier(){
    return mapF;
}

//initModels();
initMapF();

module.exports.mapModel=mapModel;
module.exports.mapFichier=mapFichier;
module.exports.initModels=initModels;
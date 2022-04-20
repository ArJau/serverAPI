var mongoose = require('mongoose');
var mongoDbUrl;
mongoDbUrl = 'mongodb://127.0.0.1:27017'; //CHANGE_URL

async function initDb(dbName){
    mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName : dbName });
    var db = mongoose.connection;
    db.on('error' , function() { 
        console.log("mongoDb connection error = " + " for dbUrl=" + mongoDbUrl  + "/" + dbName);
    });
    db.once('open', function() {
    // we're connected!
    console.log("Connected correctly to mongodb database: "  + mongoDbUrl  + "/" + dbName);
    });
    return db;
}


module.exports.initDb = initDb;
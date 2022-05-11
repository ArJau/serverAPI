var express = require('express');
var transportRoutes = require('./transportRoutes.js');
var bodyParser = require('body-parser');
var app = express();

//support parsing of JSON post data
var jsonParser = bodyParser.json() ;

//var jsonParser = express.json({extended:true}) ;
app.use(jsonParser);

// CORS enabled with express/node-js :
app.use((req,res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH, PUT, POST, DELETE,OPTIONS');
    next();
});

//les routes en /html/... seront gérées par Express par
//de simples renvois des fichiers statiques
//du répertoire "./html"
app.use('/html', express.static(__dirname+"/html"));
app.get('/', function(req , res ) {
  res.redirect('/html/index.html');
});


app.use(transportRoutes.apiRouter);

function initialisationsXyz(){
    console.log("http://localhost:8282");
};

const server = app.listen(8282 , ()=> {
    initialisationsXyz();
});

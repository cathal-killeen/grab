var express = require('express');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());


// default route
app.get('/', function(req,res){
    res.send('Welcome to Grab');
})


app.listen(PORT, function(){
        console.log("Listening on port " + PORT + "...");
})

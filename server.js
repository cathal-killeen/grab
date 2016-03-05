var express = require('express');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());


// default route
app.use('/', express.static('www'));


app.listen(PORT, function(){
        console.log("Listening on port " + PORT + "...");
})

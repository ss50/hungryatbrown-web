var express = require('express');
var https = require('https');
var connect = require('connect');
var hbs = require('hbs')
var app = express();
var RATTY = "ratty";
var VDUB  = "vdub";
var ACO   = "andrews";
var IVY   = "ivy";
var JOS   = "jos";
var BLUE  = "blueroom";
//Visit localhost:8080
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', __dirname + '/'); // tell Express where to find templates

app.use(express.static(__dirname + '/'));


getServerTime();
getAllMenus();

//HTTP get request creator. Need way to feed in formatted urls
//base request:https://api.students.brown.edu/dining/menu?client_id=hackathon

function getServerTime() {
    var date = new Date();

    date.setTime(date.getTime());
    console.log(date);
    return date;
}

function getAllMenus()
{
    var rattyurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=" +RATTY;
    var vduburl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=" +encodeURI(VDUB);
    var acourl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery="+encodeURI(ACO);
    var ivyurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery="+encodeURI(IVY);
    var josurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery="+encodeURI(JOS);
    var blueurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery="+encodeURI(BLUE);
    
}

app.get('/', function(request, response){
    response.render('index.html', {});
});

app.get('/free-food', function(request, response){
    response.render('freeFood.html', {})
});

app.listen(process.env.PORT || 5000);


var express = require('express');
var https = require('https');
var connect = require('connect');
var util = require('util');
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

//xmlDoc=loadXMLDoc("http://morningmail.brown.edu/xml.php?feed=all&days=7");


// document.write(xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue + "<br>");
// document.write(xmlDoc.getElementsByTagName("author")[0].childNodes[0].nodeValue + "<br>");
// document.write(xmlDoc.getElementsByTagName("year")[0].childNodes[0].nodeValue);


app.get('/', function(request, response){
    response.render('index.html', {});
});

app.get('/free-food', function(request, response){
    response.render('freeFood.html', {})
    // cmd = system("python __init__.py");
    // cmd = shell.("python __init__.py");
    // console.log('yay');
});

// var PythonShell = require('python-shell');

// PythonShell.run('__init__.py', function (err) {
//   if (err) throw err;
//   console.log('finished');
// });

require('child_process')
    .exec('python __init__.py', function (err) {
      if (err) throw err;
      console.log('finished');
    })

// var parseString = require('xml2js').parseString;


// var options = {
//   hostname: 'localhost',
//   port: 5000,
//   path: '/',
//   method: 'GET',
// };

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {

//     console.log('BODY: ' + chunk);

//     var xml = 
//     parseString(xml, function (err, result) {
//     console.log("result:"+result);
//     //console.dir(result);
//     console.log(util.inspect(result, false, null));
// });
//   });
//});



app.listen(process.env.PORT || 5000);


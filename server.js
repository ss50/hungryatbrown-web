var express = require('express');
var fs = require('fs');
var async = require('async');
var https = require('https');
var app = express();
var RATTY = "ratty";
var VDUB  = "vdub";
var ACO   = "andrews";
var IVY   = "ivy";
var JOS   = "jos";
var BLUE  = "blueroom";
//Visit localhost:8080
app.listen(8080, function() { console.log(' - listening on port 8080');});
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
    https.get(rattyurl,function(res) {
        console.log("Got response: " +res.statusCode);
        console.log(res);
    });
    
    //async.parallel({
   //https.get(rattyurl, function(res) {
     //     console.log("Got response: " + res.statusCode);
//          callback(null, res);
//        }).on('error', function(e) {
//          console.log("Got error: " + e.message);
//        });
    
}
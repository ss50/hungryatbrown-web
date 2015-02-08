var RATTY = "ratty";
var VDUB  = "vdub";
var ACO   = "andrews";
var IVY   = "ivy";
var JOS   = "jos";
var BLUE  = "blueroom";
var rattyurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=ratty";
var testurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=ratty&hour=10&day=7&month=2"
var vduburl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=vdub";
var somedata;
var closingsoon;
var closed;
//test methods
 $(window).load(function() {

        $("#hello").click(function() {

            getVdub();
        });

    });
function getServerTime() {
    var date = new Date();

    date.setTime(date.getTime());
    console.log(date);
    return date;
}
//gets vdub menu at the current time, returns array of array
//similary, if 30 minutes or less before vdub closure, return's the next day's menu. 
function getVdub(){
    var baseurl = vduburl;
    var date = getServerTime();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var isopen = true;
    var tomorrow;
    var earlybreakfast = false;
    var closingsoon;
    
    if((hour>7)||(hour===7)&&(minutes<30)){
        isopen = false;
        earlybreakfast = true;
    }
    if((hour>19)||(hour===19)&&(minutes>30)){
        isopen = false;
        tomorrow = true;
    }
    //get tomorrow's menu later, change url now.
    if(tomorrow){
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(date.getDay()+1)+"&hour=8";
    }
    //if early on a day before vdub opens, get next day's menu
    if(earlybreakfast){
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(date.getDay())+"&hour=8";
    }
    closingsoon =hour===19&&minutes<30;
    if(closingsoon){
        closingsoon = "Closing Soon";
    }
    else{
        closingsoon = "Not Closing Soon";
    }
    var results = [];
    $.ajax( {
            url: baseurl,
            dataType: "jsonp",
            success: function(data) {
                //assign retrieved data to variable. Vdub only has two menus every day
                temp = data;
                //console.log(data);
                console.log(data.menus[0]);
                var allmenus = data.menus[0];
                var dailysbar = allmenus["daily sidebars"];
                var mainmenu = allmenus["main menu"];
                results.push(dailysbar);
                results.push(mainmenu);
                console.log(results);
                return results;
            }
        });
}
//gets ratty menu at the time, returns array.
//if 30 minutes or less before ratty closure, returns tomorrow's menu
function getRatty(){
    var temp;
    var baseurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=ratty";
    var date = getServerTime();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    //if greater than 7:30 pm, then display tomorrow's menu
    var tomorrow = false;
    if((hour==19&&minutes>30)||hour>19){
        closed = true;
       //get tomorrow morning's menu
       baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(date.getDay()+1)+"&hour=10";
        console.log(baseurl);
        tomorrow = true;
    }
    //somehow, really early morning, display breakfast of that day
    if(hour<7||(hour==7&&minutes<30)){
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(date.getDay())+"&hour=10";
   }
    console.log(date+" "+hour+" "+minutes+" "+(date.getMonth()));
    if(hour===19&&minutes<30){
        closingsoon = "Closing Soon";
    }
    else{
        closingsoon = "Not Closing Soon";
    }
    var results = [];
     $.ajax( {
            url: baseurl,
            dataType: "jsonp",
            success: function(data) {
                //assign retrieved data to variable
                temp = data;
                //console.log(data);
                console.log(data.menus[0]);
                var allmenus = data.menus[0];
                var bistro = allmenus.bistro;
                var chefcorner = allmenus["chef's corner"];
                var dailysbar = allmenus["daily sidebars"];
                console.log(bistro);
                console.log(chefcorner);
                console.log(dailysbar);
                results.push(bistro);
                results.push(chefcorner);
                results.push(dailysbar);
                var grill;
                var rootsshoots;
                if(hour>11&&!tomorrow){
                    grill = allmenus["grill"];
                    rootsshoots = allmenus["roots & shoots"];
                    console.log(grill);
                    console.log(rootsshoots);
                    results.push(grill);
                    results.push(rootsshoots);
                }
                return results;
            }
        });
    
    
}
function defaultsearch(){
    $(window).load(function() {

        $("#hello").click(function() {

            $.ajax( {
                url: rattyurl,
                dataType: "jsonp",
                success: function(data) {
                    console.log(data.menus[0].eatery);
                    somedata = data;
                }
            });
        });

    });
}
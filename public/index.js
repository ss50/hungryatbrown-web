var RATTY = "ratty";
var VDUB  = "vdub";
var ACO   = "andrews";
var IVY   = "ivy";
var JOS   = "jos";
var BLUE  = "blueroom";
var rattyurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=ratty";
var testurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=ratty&hour=10&day=7&month=2";
var vduburl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=vdub";
var somedata;
var closingsoon;
var closed;
var rattyfinalres=[];
var vdubfinalres=[];
//test methods
$(window).load(function() {
console.log("here");
         //$("#hello").click(function() {

         getVdub();
         //});

//     getRatty();
//     console.log(length(rattyfinalres[0]));
//     getVdub();

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
    var closed = false;
    var tomorrow = false;
    var earlybreakfast = false;
    var closingsoon;
    var day = date.getDay();
    var monthday = date.getDate();
    //vdub closes over the weekend
    if(day===6||day===0){
        console.log("weekend");
        if(day===6){
            baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(monthday+2)+"&hour=8";
        }
        else{
            baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(monthday+1)+"&hour=8";
        }
        closed = true;
    }
    else{
        if((hour<7)||((hour===7)&&(minutes<30))){
            closed = true;
            earlybreakfast = true;
        }
        if((hour>19)||((hour===19)&&(minutes>30))){
            closed = true;
            tomorrow = true;
        }
    }
    //vdub is closed between 2:30 -4:30 pm. This deals with that edge case. Gets next meal, which is dinner that day.
    var isgreater = (hour>14)||((hour===14)&&(minutes>30));
    var islesser = (hour>16)||((hour===16)&&(minutes<30));
    if(isgreater&&islesser){
        closed= true;
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(monthday+1)+"&hour=5";
    }
    console.log(closed);
    //get tomorrow's menu later, change url now.
    if(tomorrow){
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(monthday+1)+"&hour=8";
    }
    //if early on a day before vdub opens, get next menu for that day
    if(earlybreakfast){
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(day)+"&hour=8";
    }
    //if less than thirty minutes from closing time
    closingsoon = (hour===19&&minutes<30);
    if(closingsoon){
        closingsoon = "Closing Soon";
    }
    else{
        closingsoon = "Not Closing Soon";
    }
    var vdubresults = [];  
    $.ajax( {
            url: baseurl,
            dataType: "jsonp",
            success: function(data) {
                //assign retrieved data to variable. Vdub only has two menus every day
                temp = data;
                //console.log(data);
                //console.log(data.menus[0]);
                var allmenus = data.menus[0];
                var dailysbar = allmenus["daily sidebars"];
                var mainmenu = allmenus["main menu"];
                vdubresults.push(dailysbar);
                vdubresults.push(mainmenu);
                console.log(vdubresults);
                vdubfinalres = vdubresults;
                return vdubresults;
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
    var dayofmonth = date.getDate();
    closed = false;
    if((hour==19&&minutes>30)||hour>19){
        closed = true;
       //get tomorrow morning's menu
       baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(dayofmonth+1)+"&hour=10";
        console.log(baseurl);
        tomorrow = true;
    }
    //somehow, really early morning, display breakfast of that day
    if(hour<7||(hour==7&&minutes<30)){
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(dayofmonth)+"&hour=10";
   }
    console.log(date+" "+hour+" "+minutes+" "+(date.getMonth()));
    if(hour===19&&minutes<30){
        closingsoon = "Closing Soon";
    }
    else{
        closingsoon = "Not Closing Soon";
    }
    var rresults = [];
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
                rresults.push(bistro);
                rresults.push(chefcorner);
                rresults.push(dailysbar);
                var grill;
                var rootsshoots;
                if(hour>11&&!tomorrow){
                    grill = allmenus["grill"];
                    rootsshoots = allmenus["roots & shoots"];
                    rresults.push(grill);
                    rresults.push(rootsshoots);
                }
                console.log(rresults);
                rattyfinalres = rresults;
                return rresults;
            }
        });
    
    
}

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


function highlightTimeOfDay(id) {
    $(".meals-active").remove();
    $(id).addClass("meals-active");
}

  
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
            highlightTimeOfDay("#breakfast");
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
        highlightTimeOfDay("#dinner");
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
                var allmenus = data.menus[0];
                var dailysbar = allmenus["daily sidebars"];
                var mainmenu = allmenus["main menu"];
                vdubresults.push(["Daily Sidebar", "sidebar", dailysbar]);
                vdubresults.push(["Main Menu", "main-menu", mainmenu]);
                
                displayMenu(vdubresults);
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
    console.log("Hour: " + hour + " minutes: " + minutes);
    if((hour==19&&minutes>30)||hour>19){
        closed = true;
        //get tomorrow morning's menu
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(dayofmonth+1)+"&hour=10";
        console.log(baseurl);
        console.log("Breakfast time");
        tomorrow = true;
        highlightTimeOfDay("#breakfast");
    }
    //somehow, really early morning, display breakfast of that day
    if(hour<7||(hour==7&&minutes<30)){
        console.log("Breakfast time");
        baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(dayofmonth)+"&hour=10";
        highlightTimeOfDay("#breakfast");
    }
    console.log(date+" "+hour+" "+minutes+" "+(date.getMonth()));
    if (hour > 11 && hour <=15){
        console.log("Lunch time");
        highlightTimeOfDay("#lunch");
    }
    if (hour >= 16 && hour <= 19) {
        console.log("Dinner time");
        highlightTimeOfDay("#dinner");
    }
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

                var allmenus = data.menus[0];
                var grill;
                var rootsshoots;
                var bistro = allmenus["bistro"]
                var chefcorner = allmenus["chef's corner"];
                var dailysbar = allmenus["daily sidebars"];
                rresults.push(["Bistro", "bistro", bistro]);
                rresults.push(["Chef's Corner", "chef's-corner", chefcorner]);
                rresults.push(["Daily Sidebar", "daily_sidebars", dailysbar]);
                
                if(hour>11&&!tomorrow){
                    grill = allmenus["grill"];
                    rootsshoots = allmenus["roots & shoots"];
                    rresults.push(["Grill", "grill", grill]);
                    rresults.push(["Roots and Shoots", "roots-and-shoots", rootsshoots]);
                }

                displayMenu(rresults);
            }
        });    
}

function getEvents(){
    var workingurl = "http://api.douban.com/v2/book/1220562";
    var url = "https://arcane-shore-1097.herokuapp.com";
    var results = [];
    console.log("Inside getEvents()");

    $.ajax({
        dataType: "jsonp",
        url: url,
        data: {"callback":"myfunction"},
        success: myfunction,
        cache:false
    });

}

function displaySection(title, sectionid, data){
    var section = document.getElementById(sectionid);
    var sectiontitle = document.createElement("h4");
    var divider = document.createElement("hr");

    sectiontitle.setAttribute("class", "menu-title");
    divider.setAttribute("id", "divider");
    sectiontitle.innerHTML = title;
    section.appendChild(sectiontitle);
    section.appendChild(divider);

    for (var i = 0; i < data.length; i++){
        var row = document.createElement("div");
        var foodcontent = document.createElement("div");
        var foodname = document.createElement("h3");
        var subdivider = document.createElement("hr");

        row.setAttribute("id", "row");
        foodcontent.setAttribute("class", "food-content");
        foodname.setAttribute("id", "food-name");
        subdivider.setAttribute("id", "subdivider");

        foodname.innerHTML = data[i];

        foodcontent.appendChild(foodname);
        foodcontent.appendChild(subdivider);

        row.appendChild(foodcontent);
        section.appendChild(row);
    }
}

function displayMenu(data){
    for (var i = 0; i < data.length; i++){
        displaySection(data[i][0], data[i][1], data[i][2]);
    }
}

function myfunction(data){
    console.log(data);
}

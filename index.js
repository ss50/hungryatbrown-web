var RATTY = "ratty";
var VDUB  = "vdub";
var ACO   = "andrews";
var IVY   = "ivy";
var JOS   = "jos";
var BLUE  = "blueroom";
var rattyurl = "https://api.students.brown.edu/dining/menu?client_id=hackathon&eatery=ratty";

var somedata;
var closingsoon;
var closed;
//test methods
 $(window).load(function() {

        $("#hello").click(function() {

            getRatty();
        });

    });
function getServerTime() {
    var date = new Date();

    date.setTime(date.getTime());
    console.log(date);
    return date;
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
    
    if((hour==19&&minutes>30)||hour>19){
        closed = true;
       //get tomorrow morning's menu
       baseurl = baseurl +"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+(date.getDay()+1)+"&hour=12";
        console.log(baseurl);
    }
    console.log(date+" "+hour+" "+minutes+" "+(date.getMonth()));
    if(hour===17&&minutes<30){
        closingsoon = "Closing Soon";
    }
    else{
        closingsoon = "Not Closing Soon";
    }
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
                var grill;
                var rootsshoots;
                if(hour>11){
                    grill = allmenus["grill"];
                    rootsshoots = allmenus["roots & shoots"];
                    console.log(grill);
                    console.log(rootsshoots);
                }
            }
        });
    //var menuitems = temp.menus;
    //for(int i;i<t
    
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
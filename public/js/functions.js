function toggleNav() {
    var menu = document.getElementById("menu-button"), current_class = menu.className;
    var nav = document.getElementById("nav-container");
    var list = document.getElementById("container");
    var bg = document.getElementById("background");
    
    menu.className = (current_class == "open") ? "" : "open";

    if (nav.className != "nav-opened") {
        nav.className = "nav-opened";
        bg.className = "nav-opened";
        list.className = "nav-opened";
    } else {
        nav.className = "";
        bg.className = "";
        list.className = "";
    }
}

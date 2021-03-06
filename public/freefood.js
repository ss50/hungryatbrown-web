var map;
var addresses;

function getEvents(){
	var baseurl = "https://arcane-shore-1097.herokuapp.com";

	$.ajax({
        dataType: "jsonp",
        url: baseurl,
        data: {"callback":"addEvents"},
        success: addEvents,
        cache:false
    });

}

function addEvents(data) {
	addresses = data;
	if (data.length == 0){
		$("#no-free-food").show();
	} else {
		$("#no-free-food").hide();
		displayEvents(data);
		google.maps.event.addDomListener(window, 'load', initialize);
	}
	
}

function displayEvents(data){
	var background = document.getElementById("background");

	for (var i = 0; i < data.length; i++){
		console.log("Inside displayEvents");
		var row = document.createElement("div");
		var content = document.createElement("div");
		var name = document.createElement("h3");
		var time = document.createElement("h3");
		var place = document.createElement("h5");
		var desc = document.createElement("p");
		var divider = document.createElement("hr");
		var image = document.createElement("img");

		row.setAttribute("id", "event-row");
		content.setAttribute("class", "event-content");
		name.setAttribute("class", "event-name");
		time.setAttribute("class", "event-time");
		place.setAttribute("class", "event-place");
		divider.setAttribute("id", "events-subdivider");
		image.setAttribute("class", "marker-image");
		desc.setAttribute("class", "event-desc")

		name.innerHTML = data[i]["summary"];
		time.innerHTML = data[i]["start"]["time"];
		place.innerHTML = data[i]["location"]["address"];
		desc.innerHTML = data[i]["description"];
		image.src = "images/marker.png";
		calEvent = addToCalendar(data[i]);
		console.log(data[i]);

		content.appendChild(name);
		content.appendChild(time);
		content.appendChild(place);
		content.appendChild(desc);
		content.appendChild(calEvent);

		row.appendChild(image);
		row.appendChild(content);
		background.appendChild(row);
		background.appendChild(divider);

	}
}

function initialize() {
		
		var bounds = new google.maps.LatLngBounds();
		var geocoder = new google.maps.Geocoder();
		map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 15,
			center: bounds.getCenter()
		});
	  	

	  // Try HTML5 geolocation
	  
	  	if(navigator.geolocation) {
	  		
	    	navigator.geolocation.getCurrentPosition(function(position) {
	      	var pos = new google.maps.LatLng(position.coords.latitude,
	                                       position.coords.longitude);

	      	map.setCenter(pos);

	    }, function() {
	      handleNoGeolocation(true);
	    });
	  } else {
	    // Browser doesn't support Geolocation
	    handleNoGeolocation(false);
	  }
	  
	var count = 1	

	for (var i = 0; i < addresses.length; i++){
		var name = addresses[i]["summary"];
		console.log(name);
		geocoder.geocode( {'address': addresses[i]["mappableLocation"]}, function(results, status){
			if (status == google.maps.GeocoderStatus.OK){
				console.log("Able to geocode location");
				var location = new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.D);
				console.log(count);
				var marker = new google.maps.Marker({
					position: location,
					map: map,
					icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + count + '|FF0000|000000'
				});
				bounds.extend(location);
			} else {
				console.log("Cannot drop pins: invalid location");
			}
			count++;
		});

		
	}

	

	//map.fitBounds(bounds);

	console.log("Map zoom level: " + map.getZoom());
}

			

	function handleNoGeolocation(errorFlag){
		var content = "";
		if(errorFlag){
			content = 'Error: The Geolocation service failed.';
		} else {
			content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};

		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position)
	}

	function addToCalendar(data) {
		console.log("Inside add to calendar");
		anchor = document.createElement("a");
		anchor.setAttribute("class", "addthisevent");
		anchor.href = "CALSHOW://";
		anchor.setAttribute("title", "Add To Calendar");
		anchor.setAttribute("data-role", "none");
		anchor.setAttribute("data-direct", "google");
		anchor.setAttribute("style", "margin-right: 14%");

		// start, end, summary
		start = document.createElement("span");
		end = document.createElement("span");
		summary = document.createElement("span");

		start.setAttribute("class", "_start");
		end.setAttribute("class", "_end");
		summary.setAttribute("class", "_summary");

		start.innerHTML = data["start"]["shortdate"] + " " + data["start"]["time"];
		end.innerHTML = data["end"]["shortdate"] + " " + data["end"]["time"];
		summary.innerHTML = data["summary"];

		anchor.appendChild(start);
		anchor.appendChild(end);
		anchor.appendChild(summary);

		return anchor;
	}
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
	displayEvents(data);
	console.log(data);
	google.maps.event.addDomListener(window, 'load', initialize);
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
		var divider = document.createElement("hr");
		var image = document.createElement("img");

		row.setAttribute("id", "event-row");
		content.setAttribute("class", "event-content");
		name.setAttribute("class", "event-name");
		time.setAttribute("class", "event-time");
		place.setAttribute("class", "event-place");
		divider.setAttribute("id", "events-subdivider");
		image.setAttribute("class", "marker-image");

		name.innerHTML = data[i]["summary"];
		time.innerHTML = data[i]["start"]["time"];
		place.innerHTML = data[i]["location"]["address"];
		image.src = "images/marker.png";

		content.appendChild(name);
		content.appendChild(time);
		content.appendChild(place);

		row.appendChild(image);
		row.appendChild(content);
		background.appendChild(row);
		background.appendChild(divider);

	}
}

function initialize() {
		
		var bounds = new google.maps.LatLngBounds();
		var geocoder = new google.maps.Geocoder();
	  	var mapOptions = {
	    	zoom: 14
	  	};
	  	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
	

	for (var i = 0; i < addresses.length; i++){
		var name = addresses[i]["summary"];
		geocoder.geocode( {'address': addresses[i]["mappableLocation"]}, function(results, status){
			if (status == google.maps.GeocoderStatus.OK){
				console.log("Able to geocode location");
				var location = new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.D);
				
				var marker = new google.maps.Marker({
					position: location,
					map: map,
					title: name
				});

				bounds.extend(location);
			} else {
				console.log("Cannot drop pins: invalid location");
			}
		});
	}

	map.fitBounds(bounds);
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
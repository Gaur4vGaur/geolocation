var map;
var infoWindow;
var markers = [];
var geocoder;

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;	
  
	var pLocation = document.getElementById("location");
	pLocation.innerHTML = latitude + ", " + longitude;
  
	showMap(position.coords);
}

function showMap(coords) {

	var googleLatLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {
		zoom: 3,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
  
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	infoWindow = new google.maps.InfoWindow();

	geocoder = new google.maps.Geocoder();
	getAddressFromLatLang(coords.latitude, coords.longitude);

	google.maps.event.addListener(map, "click", function(event) {
		var latitude = event.latLng.lat();
		var longitude = event.latLng.lng();
		
		var pLocation = document.getElementById("location");
		pLocation.innerHTML = latitude + ", " + longitude;
		map.panTo(event.latLng);
	});
}

function displayError(error) {
	var errors = ["Unknown error", "Permission denied by user", "Position not available", "Timeout error"];
	var message = errors[error.code];
	console.warn("Error in getting your location: " + message, error.message);
}

function geocodeAddress() {
	var address = document.getElementById("address").value;
	mapGeocodeAddress(address);
}

function mapGeocodeAddress(address) {
    
    geocoder.geocode({ 'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        	var latLng = results[0].geometry.location
            map.setCenter(latLng);
            markers.push(latLng);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            map.setZoom(3);
            map.panTo(marker.position);
            addEditablePolygon();
        } else {
            alert("Geocode failed with the following error: " + status);
        }
    });
}

function getAddressFromLatLang(lat,lng){

    var latLng = new google.maps.LatLng(lat, lng);
    geocoder.geocode( { 'latLng': latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            mapGeocodeAddress(results[1].formatted_address);
          }
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
    });
  console.log("Entering getAddressFromLatLang()");
}

function addEditablePolygon() {
    var natureCoords = markers.slice();

	var lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };

    var natureArea = new google.maps.Polyline({
        path: natureCoords,
        strokeColor: "#2F4F4F",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        icons: [{icon: lineSymbol,offset: '100%'}]
    });

    natureArea.setMap(map);
}

function animateCircle(line) {
      var count = markers.length;
      window.setInterval(function() {
        count = (count + 1) % 800;

        var icons = line.get('icons');
        icons[0].offset = count + '%';
        line.set('icons', icons);
    }, markers.length*10);
  }

window.onload = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert("Sorry, this browser doesn't support geolocation!");
	}
}








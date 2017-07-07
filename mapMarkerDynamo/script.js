var map;
var infoWindow;
var markers = [];

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
		zoom: 10,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
  
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	infoWindow = new google.maps.InfoWindow();

	createAccentureLatLong();
	createOpencastLatLong();
	createSageLatLong();
	createHMRCLatLong();
	createCapLatLong();
	createCampusNorthLatLong();
}

function createAccentureLatLong() {
	var latLng = new google.maps.LatLng(55.023635, -1.511710);
	var content = "<strong>Accenture</strong><br>" +
					"<strong>Interest:</strong> Java, Scala, Salesforce, Machine Learning<br>" +
					"<strong>Talking about</strong> AI, cryptocurrency, salesforce"
	createMarker(latLng, content);
}

function createOpencastLatLong() {
	var latLng = new google.maps.LatLng(54.970056, -1.581332);
	var content = "<strong>Opencast</strong><br>" +
					"<strong>Interest:</strong> Scala, Node, Angular<br>" +
					"<strong>Talking about</strong> DigitalDisruption, Dynamo"
	createMarker(latLng, content);
}

function createSageLatLong() {
	var latLng = new google.maps.LatLng(55.034750, -1.648798);
	var content = "<strong>Sage</strong><br>" +
					"<strong>Interest:</strong> Java, Angular, Machine Learning<br>" +
					"<strong>Talking about</strong> crowdfunding, AI, tech"
	createMarker(latLng, content);
}

function createHMRCLatLong() {
	var latLng = new google.maps.LatLng(55.005124, -1.587256);
	var content = "<strong>HMRC</strong><br>" +
					"<strong>Interest:</strong> Java, Scala, Agile, html<br>" +
					"<strong>Talking about</strong> Tax, P800"
	createMarker(latLng, content);
}

function createCapLatLong() {
	var latLng = new google.maps.LatLng(54.970476, -1.616231);
	var content = "<strong>Capgemini</strong><br>" +
					"<strong>Interest:</strong> Java, C++, Html, Agile<br>" +
					"<strong>Talking about</strong> Blockchain, IoT, APIs"
	createMarker(latLng, content);
}

function createCampusNorthLatLong() {
	var latLng = new google.maps.LatLng(54.972910, -1.608394);
	var content = "<strong>Campus North</strong><br>" +
					"<strong>Hosting meetups</strong> on Functional Programming, Google Hack, Php"
	createMarker(latLng, content);
}

function createMarker(latLng, content) {
	var markerOptions = {
		position: latLng,
		map: map,
		clickable: true
	};

	var marker = new google.maps.Marker(markerOptions);
	markers.push(marker);

	google.maps.event.addListener(marker, "click", function(event) {
		infoWindow.setContent(content);
		infoWindow.open(map, marker);
	});
}

function displayError(error) {
	var errors = ["Unknown error", "Permission denied by user", "Position not available", "Timeout error"];
	var message = errors[error.code];
	console.warn("Error in getting your location: " + message, error.message);
}

window.onload = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert("Sorry, this browser doesn't support geolocation!");
	}
}








// method to display the geolocation, altitude, direction, speed
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var pLocation = document.getElementById("location");
    pLocation.innerHTML += latitude + "," + longitude + "<br>";

    var pInfo = document.getElementById("info");
    var date = new Date(position.timestamp);
    pInfo.innerHTML = "Location timestamp: " + date + "<br>";
    pInfo.innerHTML += "Accuracy of location: " + position.coords.accuracy + " meters<br>";

    if(position.coords.altitude) {
        pInfo.innerHTML += "Altitue: " + position.coords.altitude;
    } else {
        console.log("Altitue: " + position.coords.altitude);
    }
    pInfo.innerHTML += "<br>";

    if(position.coords.heading) {
        pInfo.innerHTML += "Heading: " + position.coords.heading + "<br>";
    } else {
        console.log("Heading is " + position.coords.heading);
    }

    if(position.coords.speed) {
        pInfo.innerHTML += "Speed: " + position.coords.speed + "<br>";
    } else {
        console.log("Speed is " + position.coords.speed);
    }
}

// Error handling code
function displayError(error) {
    var errors = ["Unknown error", "Permissions denied by user", "Position not available", "Timeout error"];
    var message = error[error.code];
    console.warn("Error in getting your location" + message + error.message);
}

// onload function to define the action that should be perfomed once the page is loaded
window.onload = function() {
    if(navigator.geolocation) {
        // display location is function passed to getCurrentPosition for callback with position
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Sorry, this browser doesn't support geolocation!");
    }
}
// method to display the geolocation
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var pLocation = document.getElementById("location");
    pLocation.innerHTML += latitude + "," + longitude + "<br>";
}

// Error handling code
function displayError(error) {
    var errors = ["Unknown error", "Permissions denied by user", "Position not available", "Timeout error"];
    var message = error[error.code];
    console.warn("Error in getting your location" + message + error.message);
}

window.onload = function() {
    if(navigator.geolocation) {
        // display location is function passed to getCurrentPosition for callback with position
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Sorry, this browser doesn't support geolocation!");
    }
}
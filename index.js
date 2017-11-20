var watchID;

var locationOptions = { 
	maximumAge: 10000, 
	timeout: 6000, 
	enableHighAccuracy: true 
};

//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button clicks
	$('#startLocationButton').on('click', updatePosition);
	$('#stopLocationButton').on('click', stopPosition);
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
});



//Call this function when you want to watch for chnages in position
function updatePosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	watchID = navigator.geolocation.watchPosition(successPosition, failPosition, locationOptions);
}

//Call this function when you want to watch for chnages in position
function stopPosition() {
	
	//change time box to show updated message
	$('#time').val("Press the button to get location data");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.clearWatch(watchID);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var time = position.timestamp;
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time);
	$('#lattext').val(latitude);
	$('#longtext').val(longitude);
	
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}
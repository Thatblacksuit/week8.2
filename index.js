//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button click
	$('#updateLocationButton').on('click', getPosition);
	$('#stopLocationButton').on('click', clearPosition);
    
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
});


//Call this function when you want to get the current position
function getPosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	var watchID = navigator.geolocation.watchPosition(Success, Fail, locationOptions);
    var locationOptions = { 
	maximumAge: 10000, 
	timeout: 6000, 
	enableHighAccuracy: true 
};

}

function clearPosition(){
    navigator.geolocation.clearWatch(watchID);
}


//called when the position is successfully determined
function Success(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	
    //Unix time
    var unixtime = new Date(position.timestamp);
    var date = unixtime.toDateString();
    var hms = unixtime.toTimeString();

	//lets get some stuff out of the position object
	var time = position.timestamp;
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
    
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + hms);
    $('#date').val("Recieved data on " + date);
	$('#lattext').val(latitude);
    $('#longtext').val(longitude);
}

//called if the position is not obtained correctly
function Fail(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}
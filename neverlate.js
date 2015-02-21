// Variables
var timeNow = new Date();
var address = '';
var latitude = 0;
var longitude = 0;
var geocoder = new google.maps.Geocoder();

// Updates view
function appendResults(text) {
    var results = document.getElementById('main');
    results.appendChild(document.createElement('P'));
    results.appendChild(document.createTextNode(text));
}

// Initializes google API
function init() {
    gapi.client.setApiKey('AIzaSyDBqr0MvwpNhEtWrR_W_8uiZcqdsbBMvZ8');
    gapi.client.load('calendar', 'v3').then(makeRequest);
}

// Handles google calendar API
function makeRequest() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'sa0dfsv5h2jhr8gdechriajc0k@group.calendar.google.com',
      'singleEvents': true, /* required to use timeMin */ 
      'timeMin': timeNow.toJSON(),
    });
    
    request.then(function(response) {
      // console.log(response.result.items[0]);
       address = response.result.items[0].location;
       appendResults(JSON.stringify(response.result.items[0], null, 2));
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
}

// Handles google geocoder (to convert addresses into latitude/longitude pairs)
geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
    } 
}); 

init()
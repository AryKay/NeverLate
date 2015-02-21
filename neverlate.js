// Configurables
reittiopasUser = '';
reittiopasPassword = '';
googleAPIKey = '';
googleCalendarId = '';

// Variables
var timeNow = new Date();
var address = 'kampp';
// var latitude = 0;
// var longitude = 0;
var geocoder = new google.maps.Geocoder();
var hslAPI = "http://api.reittiopas.fi/hsl/prod/?user=" + reittiopasUser + '&pass=' + reittiopasPassword
var latlong = '';
var currentLocation = 'CURRENT LOCATION';

// Updates view
function appendResults(text) {
    var results = document.getElementById('main');
    results.appendChild(document.createElement('P'));
    results.appendChild(document.createTextNode(text));
}

// Initializes google API
function init() {
    gapi.client.setApiKey(googleAPIKey);
    gapi.client.load('calendar', 'v3').then(makeRequest);
}

// Handles google calendar API
function makeRequest() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'googleCalendarId',
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

// Handles Reittiopas geocoder functionality
var xmlhttpGeo = new XMLHttpRequest();
xmlhttpGeo.onreadystatechange = function() {
if (xmlhttpGeo.readyState == 4 && xmlhttpGeo.status == 200) {
    var data = JSON.parse(xmlhttpGeo.responseText);
    latlong = data.coords // not tested yet
    console.log(latlong);
    }
}
xmlhttpGeo.open("GET", hslAPI + 'key=' + address, true);
xmlhttpGeo.send();

var xmlhttpRoute = new XMLHttpRequest();
xmlhttpRoute.onreadystatechange = function() {
if (xmlhttpRoute.readyState == 4 && xmlhttpRoute.status == 200) {
    var data = JSON.parse(xmlhttpRoute.responseText);
    // This is where you can get creative with the service
    // For instance, set that only journeys ending before the event's starting date are shown (Arrival parameter from reittiopas API)
    }
}
xmlhttpRoute.open("GET", hslAPI + '&from=' + currentLocation + '&to=' + latlong, true);
xmlhttpRoute.send();

// // Handles google geocoder (to convert addresses into latitude/longitude pairs)
// geocoder.geocode( { 'address': address}, function(results, status) {
// if (status == google.maps.GeocoderStatus.OK) {
//     latitude = results[0].geometry.location.lat();
//     longitude = results[0].geometry.location.lng();
//     } 
// }); 

init()
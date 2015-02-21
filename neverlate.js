// Variables
var timeNow = new Date();
var address = 'kampp';
// var latitude = 0;
// var longitude = 0;
var geocoder = new google.maps.Geocoder();
var hslAPI = "http://api.reittiopas.fi/hsl/prod/?user=arykay&pass=teamgg"
var latlong = '';

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

// Handles Reittiopas geocoder functionality
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var data = JSON.parse(xmlhttp.responseText);
    latlong = data.coords // not tested yet
    console.log(latlong);
    }
}
xmlhttp.open("GET", hslAPI + 'key=' + address, true);
xmlhttp.send();

// // Handles google geocoder (to convert addresses into latitude/longitude pairs)
// geocoder.geocode( { 'address': address}, function(results, status) {
// if (status == google.maps.GeocoderStatus.OK) {
//     latitude = results[0].geometry.location.lat();
//     longitude = results[0].geometry.location.lng();
//     } 
// }); 

init()
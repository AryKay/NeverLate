// Current Time
var timeNow = new Date();

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
       console.log(response);
       appendResults(JSON.stringify(response, null, 2));
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
}

init()
var timeNow = new Date();

function appendResults(text) {
    var results = document.getElementById('results');
    results.appendChild(document.createElement('P'));
    results.appendChild(document.createTextNode(text));
}

function init() {
    gapi.client.setApiKey('AIzaSyDBqr0MvwpNhEtWrR_W_8uiZcqdsbBMvZ8');
    gapi.client.load('calendar', 'v3').then(makeRequest);
}

function makeRequest() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'sa0dfsv5h2jhr8gdechriajc0k@group.calendar.google.com'
      'singleEvents': true, /* required to use timeMin */ 
      'timeMin': timeNow
    });

    request.then(function(response) {
      appendResults(response.result.longUrl);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
}

function neverLate(
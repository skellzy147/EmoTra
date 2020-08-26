//make request call to backend api 
function makeRequest(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.status >= 200 && request.readyState == 4) {
            callback(JSON.parse(request.responseText));
        }
    };
    request.open("GET", url, true);
    request.send();
}

function checkIfEmpty(response) {
    return Object.entries(response).length == 0;
}

exports.checkIfEmpty = checkIfEmpty;
exports.makeRequest = makeRequest;

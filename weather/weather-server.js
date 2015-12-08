var settings = require("./settings");
var http = require("http");
var fs = require('fs');

var server = http.createServer(function(request, response) {
    response.end();
}).listen(9615);

console.log("Server is listening");

http.get(settings.weatherAPIurl + settings.citiesFileName, function(res) {
    var body = '';

    res.on('data', function(chunk) {
    	console.log('chunk: '+ chunk)
        body += chunk;
    });

    res.on('end', function() {
        console.log('end!!')
    });
}).on('error', function(e) {
    console.log("Got an error: ", e);
});

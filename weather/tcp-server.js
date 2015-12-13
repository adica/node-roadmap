var net = require('net');
var settings = require("./settings");
var http = require("http");
var fs = require('fs');
var zlib = require('zlib');
var EventEmitter = require("events").EventEmitter;
var citiesBuffer = [];
var apiUrl = settings.weatherAPIurl + settings.citiesFileName;

var HOST = '127.0.0.1';
var PORT = 6969;


function getCities(url, callback) {
    http.get(url, function(res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            citiesBuffer.push(data.toString());

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            callback(null, citiesBuffer.join(""));

        }).on("error", function(e) {
            callback(e);
        })
    }).on('error', function(e) {
        callback(e)
    });
}

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {

        //console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
        if(data){
        	
        	/*var c = citiesBuffer[0].split("\n");
        	console.log(JSON.parse(c[0]));*/
        	
        	for (var i = 1; i >= 0; i--) {
        		var cities = citiesBuffer[i].split("\n")
        		for (var i = 5; i >= 1; i--) {
        			var city = JSON.parse(cities[i]);
        			console.log('city: ', city.name );
        		};
        		
        	};
        	

        	//console.log(cityArray[0]);

        }

    });

    


    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        //console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
getCities(apiUrl, function(err, data) {
      if(err) console.log('err : ',err);
      console.log('all cities : ' + data.length);
});

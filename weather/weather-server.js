var settings = require("./settings");
var http = require("http");
var fs = require('fs');
var zlib = require('zlib');
var request = require("request");

var server = http.createServer(function(req, resp) {
    //response.end();
}).listen(9615);

 var citiesBuffer = [];
var _url = settings.weatherAPIurl + settings.citiesFileName;
function getCities(url, callback) {


    http.get(url, function(res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();            
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            citiesBuffer.push(data.toString())

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

getCities(_url, function(err, data) {
      if(err) console.log('err : ',err);
      console.log('all cities : ' + data.length);
});
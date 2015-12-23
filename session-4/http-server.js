const fs = require('fs');
const path = require('path');
const settings = require("./settings");
const http = require('http');
const api = require('./client-api.js');
const cities = {};
const coords = {};
const file = fs.readFileSync(path.join(__dirname, 'data/city.list.json'), 'utf8');

const arr = file.split('\n');

arr.forEach(function(line) {
    line = line.trim().replace(/\n/g, '');
    var c = JSON.parse(line);
    cities[c.name] = c;
    coords[c.coord.lon.toString() + "_" + c.coord.lat.toString()] = c;
});

var server = http.createServer(function(req, res) {
    req.connection.addListener("data", function(data) {
        const evt = JSON.parse(data.toString('utf8'))
        switch (evt.action) {
            case 'getForecast':
                console.log('getting forecast for city ', evt.city);
                if (evt.city) {
                    api.forCity(evt.city, (err, result) => {
                        if (err) {
                            return console.error(err);
                        }
                        res.end(JSON.stringify(result));
                    });
                } else {
                    res.write('City not provided');
                }
        }
    }, false);


    res.end();
    /*res.on('data', (data) => {
      const evt = JSON.parse(data.toString('utf8'))
      switch (evt.action) {
        case 'getForecast':
          console.log('getting forecast for city ', evt.city);
          if (evt.city) {
            api.forCity(evt.city, (err, result) => {
                if (err) {
                  return console.error(err);
                }
                res.end(JSON.stringify(result));
              });
          } else {
            res.write('City not provided');
          }
        }
      })*/
});

// grab a random port.
server.listen({
    port: settings.HTTPPORT
}, function() {
    address = server.address();
    console.log("opened server on %j", address);
});

const settings = require("./settings");
const net = require('net');
const api = require('./cities-api');

var server = net.createServer(function(socket) {
  socket.on('data', (data) => {
    const evt = JSON.parse(data.toString('utf8'))
    switch (evt.action) {
      case 'getForecast':
        console.log('getting forecast for city ', evt.city);
        if (evt.city) {
          api.forCity(evt.city, (err, result) => {
              if (err) {
                return console.error(err);
              }
              socket.end(JSON.stringify(result));
            });
        } else {
          socket.write('City not provided');
        }
      }
    })
});

// grab a random port.
server.listen({
  port: settings.PORT
}, function() {
  address = server.address();
  console.log("opened server on %j", address);
});

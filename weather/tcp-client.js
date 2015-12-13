var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var selectedCity;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 


    process.argv.forEach(function(val, index, array) {
        if (val === 'city' && typeof process.argv[index + 1] !== 'undefined')
            selectedCity = process.argv[index + 1];
    });

    console.log('selectedCity: ', selectedCity);
    client.write(selectedCity);

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();

});





// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

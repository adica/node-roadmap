var http = require("http");
var server = http.createServer(function (request, response) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("hello server");
      response.end();
});

server.listen(80);
console.log("Server is listening");
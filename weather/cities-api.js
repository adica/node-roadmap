const settings = require('./settings.json');
const http = require('http');
const util = require('util');
const fs = require('fs');

const appid = fs.readFileSync('./api-key', 'utf8').trim();

var options = {
  port: 80,
  hostname: settings.apiAddress,
  method: 'GET'
};

var forCity = exports.forCity = function(city, callback){
  city = encodeURIComponent(city);
  options.path = `/data/2.5/weather?q=${city}&units=metric&appid=${appid}`;
  console.log(options.path);
  const req = http.request(options, (res)=>{
    var buffer = []
    res.on('data', (d) => {
      buffer.push(d);
    });
    res.on('end', ()=>{
      callback(null, JSON.parse(buffer.join('')));
    });
    res.on('error', (err)=>{
      callback(err);
    });
  });
  req.end();
}

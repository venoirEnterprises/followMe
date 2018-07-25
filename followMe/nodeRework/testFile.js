var http = require('http');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var mTest = require('./Scripts/mongo');
//prerequisite end




//http request
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("response" + mTest.giveMeText());
    mTest.giveMeUserWithUsername("followme_test")
    //eventEmitter.on('load',hitMongoDB);

    res.end('Hello World!');

    //eventEmitter.emit('load');
}).listen(8080);
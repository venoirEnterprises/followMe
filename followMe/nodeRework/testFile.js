var http = require('http');
var dt = require('./Scripts/newModule');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time is currently: " + dt.myDateTime());
    res.write("the url is: " + req.url);
    res.end('Hello World!');
}).listen(8080);
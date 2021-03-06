var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var router = require('./router.js');
var http = require("http");
var socketio = require('socket.io')

//port for the server to listen on
var port = process.env.PORT || process.env.NODE_PORT || 3000;
var server;

//var app = http.createServer(onRequest).listen(port);
var app = express();
app.use('/assets', express.static(path.resolve(__dirname+'/client/')));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
    //res.end();
});
app.use(compression());
app.use(favicon(__dirname + '/client/img/favicon.png'));
app.use(cookieParser());

server = app.listen(port, function(err) {
    if (err) {
      throw err;
    }
    console.log('Listening on port ' + port);
});

var io = socketio.listen(server);

io.sockets.on("connect", function(socket){

	socket.on("join", function(data){
		
        console.log("connected");
        socket.join("room1");
	});
});

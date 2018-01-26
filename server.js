// -------------------------------------
// Web Server Initialization 
// -------------------------------------

// This is an alternative to simple_server.bat, 
// and it can be used to make a dynamic server
// -------------------------------------

// For all the below to work, you need to have NodeJS installed
// then install the packages express and socket.io with:
// npm install [package_name]

var express = require('express');
var app =  express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var PORT = process.env.PORT || 5000;

app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});
server.listen(PORT, function(){ // Listens to port 8081
    console.log('Listening on port ' + server.address().port);
});

// Here we could subscribe the server to different Client side events:
io.on('connection', (socket) => function(socket){
    console.log('Client '+ socket.id +' just connect to Server.');
}
);





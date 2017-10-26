const path = require('path');
const express = require('express');
var http=require('http');
var socketIO=require('socket.io');
var app = express();
var server=http.createServer(app);
var io=socketIO(server);
var port=process.env.PORT || 3000;
const publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
	console.log("Connected to Client");
	socket.emit("newMessage",{from:"public",text:"Hey what's up?",createAt:123});
    socket.on("createMessage",function (data){console.log(data)});
	socket.on('disconnect',()=>{
	console.log("Disconnected to Client")
});
});

server.listen(port,()=>{
  console.log("Server is upon port 3000");
});

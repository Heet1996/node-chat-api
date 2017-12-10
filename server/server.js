const path = require('path');
const express = require('express');
var http=require('http');
var socketIO=require('socket.io');
var app = express();
var server=http.createServer(app);
var io=socketIO(server);
var port=process.env.PORT || 3000;
var {generateMessage,generateLocationMessage}=require('./utility/message.js')
const publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
	console.log("Connected to Client");
	socket.emit("newMessage",generateMessage("Admin" ,"Welcome new User"));
	socket.broadcast.emit("newMessage",generateMessage("Admin" ,"New User join in"));

    socket.on("createMessage",function (data,callback){
    	
        io.emit("newMessage",generateMessage(data.from,data.text ));
    	callback();
    });
    socket.on("shareLocation",function(position){ 
    	
    	io.emit("newLocationMessage",generateLocationMessage("Admin",position.lat,position.long));

    });
	
    socket.on('disconnect',()=>{
	console.log("Disconnected to Client");});
});
server.listen(port,()=>{
  console.log("Server is upon port 3000");
});

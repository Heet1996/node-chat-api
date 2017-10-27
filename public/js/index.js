var socket = io();
socket.on("connect",()=>{
		console.log("Connected to server");
		
		socket.on("newMessage",function(data){console.log(data)});
	});

socket.on("disconnect",()=>{
				console.log("Disconnected to server");
	});
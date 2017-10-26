var socket = io();
socket.on("connect",()=>{
		console.log("Connected to server");
		socket.emit("createMessage",{from:"Heet",text:"Hey what's up?"});
		socket.on("newMessage",function(data){console.log(data)});
	});

socket.on("disconnect",()=>{
				console.log("Disconnected to server");
	});
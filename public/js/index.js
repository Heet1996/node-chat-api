var socket = io();
socket.on("connect",()=>{
		console.log("Connected to server");
		});

socket.on("disconnect",()=>{
				console.log("Disconnected to server");
	});
socket.on("newMessage",function(message){
	var li=jQuery("<li></li>");
	li.text(`${message.from}: ${message.text}`);
	jQuery('#messages').append(li);
});
jQuery("#message-box").on("submit",function(e){
e.preventDefault();
var textMessage=jQuery("[name=message]");
socket.emit("createMessage",{from:"User",text:" "+textMessage.val()},function(){textMessage.val('')});
});
var locationbutton=jQuery("#send-location");
locationbutton.on("click",function(){
	if(!navigator.geolocation)
	{
		return alert('Location not supported by your browser');
	}
	 locationbutton.attr("disabled","disabled").text('Sending Location....');



	navigator.geolocation.getCurrentPosition(function(position){ 
		
		var lat=position.coords.latitude;
		var long=position.coords.longitude;
		socket.emit("shareLocation",{lat,long});
		locationbutton.removeAttr('disabled').text('Send Location');
	}
		,function(){alert("Please allow to access location");
					locationbutton.removeAttr('disabled').text('Send Location');	
	});

});
socket.on("newLocationMessage",function(location){
			var li=jQuery("<li></li>");
			var a=jQuery('<a target="_blank">My Current Location</a>');
			li.text(`${location.from}:`);
			a.attr('href',location.url);
			li.append(a);
			jQuery("#messages").append(li);
		});
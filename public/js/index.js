var socket = io();
socket.on("connect",()=>{
		console.log("Connected to server");
		});

socket.on("disconnect",()=>{
				console.log("Disconnected to server");
	});
socket.on("newMessage",function(message){
	var time=moment(message.createAt).format("h:mm a");
	var template=jQuery('#message-template').html(); 

	var html=Mustache.render(template,{
		from: message.from,
		text: message.text,
		createAt: time});

	jQuery('#messages').append(html);

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
			
			var time=moment(location.createAt).format("h:mm a");
			
			
			
			
			var template=jQuery("#send_location").html();
			var html=Mustache.render(template,{from:location.from,createAt:time,url:location.url});
			jQuery("#messages").append(html);
		});
const socket = io('http://localhost:9009');

// Este desarrollo deberia darse en cualquier elemento que utilice socket io client
socket.on('showNotification', function(data){
    console.log("notificacion!!");
})


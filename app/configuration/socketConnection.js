const socket = io('http://10.9.0.112:9009');

// Este desarrollo deberia darse en cualquier elemento que utilice socket io client
socket.on('showNotification', function(data){
    console.log("notificacion!!");
})


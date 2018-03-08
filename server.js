let open = require('amqplib').connect('amqp://guest:guest@rabbit:5672');

let app = require('express')();
let http = require('http').Server(app);
let socketio = require('socket.io');
let io = socketio(http);



io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});




let queue = 'websocket';

 
// Consumer
open.then(function(conn) {
  http.listen(8988, function(){
    console.log('listening on *:8988');
  });
  return conn.createChannel();
}).then(function(channel) {
  return channel.assertQueue(queue).then(function(ok) {
    return channel.consume(queue, function(msg) {
      if (msg !== null) {
        io.emit('message', msg.content.toString());
        console.log(msg.content.toString());
        channel.ack(msg);
      }
    });
  });
}).catch((error) => {
  console.warn(error);
});
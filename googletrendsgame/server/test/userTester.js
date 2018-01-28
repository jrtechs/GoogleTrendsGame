const io = require('socket.io-client');
const rel = require('readline');
const url = 'http://129.21.91.149:3000';

var rl = rel.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var socket = io.connect(url);
rl.on('line', function(line){
    var event = line.substring(0,line.indexOf(' '));
    var msg = line.substring(line.indexOf(' ') + 1);
    switch(event){
      case 'joinRoom':
      case 'createRoom':
        msg = JSON.parse(msg);

      case 'register':
      case 'submitWord':
        socket.emit(event, msg);
    }
});
var print = function(data){
  console.log(data);
};

socket.on('sendRooms', print);
socket.on('updateRoom', print);
socket.on('registerFailed', print);
socket.on('joinFailed', print);

const io = require('socket.io-client');
const util= require('../utils');
const url = 'http://129.21.91.149:3000';
var sockets = [];
//sockets['yaboi1'] = io.connect(url);
//sockets['yaboi1'] = io.connect(url);


  sockets[0]= io.connect(url);
  sockets[0].emit('register', 'bigleaderman');
  sockets[0].emit('createRoom', {password:'123', capacity:'4'});
  for(var j = 0; j < 3; ++j){
    sockets[j+1] = io.connect(url);
    sockets[j+1].emit('register', 'UgandanKnuckles' + j);
    sockets[j+1].emit('joinRoom', {roomName:'bigleaderman', password:'123'});
  }

  //for(var r = 0; r < 7; ++r){
    //setTimeout(function(){
      for(var u = 1; u <= 3; ++u){
        sockets[u].emit('submitWord',util.getRandomWords(1)[0]);
      }
  //  }, 5000);
  //}

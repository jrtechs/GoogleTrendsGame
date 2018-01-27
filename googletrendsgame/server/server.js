var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000;

var room = function(capacityP, roomN)
{
    //max capacity of room -- default is 4 for now
    this.capacity = capacityP;

    //name of the room
    this.roomName = roomN;

    //list of words used in the game
    this.words = [];

    //list of clients sockets -- so we can push requests to them
    this.users = [];

    //increments when rounds pass
    this.currentRoom = 0;

    /**
     * adds a user to a room
     * @param socket
     */
    this.addUser = function(socket)
    {

    }

}

var player = function(name)
{
    //name of the user
    this.name = name;

    //score of the player
    this.score = 0;

    //reference to the room -- might not need this
    this.room = null;


    //
    this.sumbission = null;
}

//list of all the rooms
var rooms = [];

//Whenever someone connects this gets executed
io.on('connection', function(socket)
{
    console.log('A user connected');


    socket.on('clientEvent', function(data) {
        console.log(data);
    });


    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(port, function() {
    console.log('listening on *:3000');
});
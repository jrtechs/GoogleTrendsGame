
//list of all the rooms
var rooms = [];

var room = function(capacityP, roomN)
{
    //max capacity of room -- default is 4 for now
    this.capacity = capacityP;

    //name of the room
    this.roomName = roomN;

    //list of words used in the game
    this.words = [];

    //list players -- so we can push requests to them
    this.users = [];

    //increments when rounds pass
    this.currentRoom = 0;

    // the password of the room -- null if no password
    this.password = null;

    /**
     * adds a user to a room
     * @param p
     * return 0 if they could join
     */
    this.addUser = function(player)
    {
        //check if room is not full
        if(this.users.length != this.capacity)
        {
            this.users.push(player)
        }
        else
        {

        }
    }

    /**
     *
     * @param p
     */
    this.removeUser = function(p)
    {
        this.users.remove(p);

        //if room is empty remove the room from rooms list
        rooms.remove(this);
    }

}

var player = function(s)
{
    //name of the user
    this.name = null;

    //players socket
    this.socket = s;

    //score of the player
    this.score = 0;

    //reference to the room -- might not need this
    this.room = null;


    //
    this.sumbission = null;
}


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000;

const utils = require('./serverUtils.js');

//Whenever someone connects this gets executed
io.on('connection', function(socket)
{
    var player = new player(socket);

    console.log('A user connected');

    /**
     *Register user nickname/handle (register)	Client => Server
     */
    socket.on('register', function(data) {
        console.log("Register event called");
        console.log(data);
        console.log("  ");

        //checks for user name in use
        if(utils.userAvailable(data, rooms))
        {
            player.name = data;
        }
        else
        {
            socket.emit('registerFailed', 'User name taken');
        }

    });

    /**
     *Create Room (createRoom) Client => Server
     * data {password:  , capacity: }
     */
    socket.on('createRoom', function(data) {
        console.log("create room event called");
        console.log(data);
        console.log("  ");


    });

    /**
     *
     */
    socket.on('joinRoom', function(data) {
        console.log("join room event called");
        console.log(data);
        console.log("  ");
    });

    socket.on('submitWord', function(data) {
        console.log("submitWord called");
        console.log(data);
        console.log("  ");
    });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(port, function() {
    console.log('listening on *:3000');
});
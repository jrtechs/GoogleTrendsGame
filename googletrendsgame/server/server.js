
//list of all the rooms
var rooms = {};

var room = function(capacityP, pass, owner)
{
    //max capacity of room -- default is 4 for now
    this.capacity = capacityP;

    //name of the room
    this.roomName = owner.name;

    this.addUser(owner);

    //list of words used in the game
    this.words = [];

    //list players -- so we can push requests to them
    this.users = [];

    //increments when rounds pass
    this.currentRound = 0;

    // the password of the room -- null if no password
    this.password = null;

    this.state = 1;

    /**
     * adds a user to a room
     * @param p
     * return 0 if they could join
     */
    this.addUser = function(player)
    {
        //check if room is not full
        this.users.push(player);
        player.room = this;
    }

    /**
     *
     * @param p
     */
    this.removeUser = function(p)
    {
        var temp = new Array();

        for(var i = 0; i < temp.length; i++)
        {
            if(p.name === this.users[i].name)
            {

            }
            else
            {
                temp.push(this.users[i]);
            }
        }

        this.users = temp;

        //if room is empty remove the room from rooms list
        if(this.users.length == 0)
        {
            rooms[this.roomName] = null;
        }
    }

    this.generateRoomUpdate()
    {

    }

    this.canJoin = function(p)
    {
        if(this.password == null)
        {
            return (this.users.length < this.capacity);
        }
        else
        {
            return (this.users.length < this.capacity) && (p === this.password);
        }
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

    this.sumbission = null;
}

var players = {};


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000;

const serverUtils = require('./serverUtils.js');

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
        if(serverUtils.userAvailable(data, players))
        {
            player.name = data;

            players[data] = player;

            socket.emit('sendRooms', serverUtils.generateSendRoomsJSON(rooms));
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
        rooms[player.name] = new room(data.capacity, data.password, player);


    });

    /**
     *
     */
    socket.on('joinRoom', function(data) {
        console.log("join room event called");
        console.log(data);
        console.log("  ");

        if(rooms[data.name].canJoin(data.password))
        {
            rooms[data.name].addUser(player);
        }
        else
        {
            socket.emit('registerFailed', 'Failed connecting to room');
        }
    });

    socket.on('submitWord', function(data) {
        console.log("submitWord called");
        console.log(data);
        console.log("  ");
    });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');

        if(rooms[player.name] != null)
        {
            rooms[player.name] = null;
        }

        //leave the room
        if(player.room != null)
        {
            player.room.removeUser(player);
        }

    });
});

http.listen(port, function() {
    console.log('listening on *:3000');
});
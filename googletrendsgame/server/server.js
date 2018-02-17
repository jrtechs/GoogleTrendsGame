/**
 * 1-27-18
 *
 * Main server file which handles users, rooms -- everythang
 */

//eh?
const serverUtils = require('./serverUtils.js');

//used for the getting the word array
const utils = require("./utils.js");




//const sqlStuff = require("./sql.js");

var Room  = require("./room");

var Player = require("./player");

//import {Room} from 'room.js';

//import {Player} from 'player.js';


//list of all players --accessed using names like a dic
var players = {};

//list of all the rooms
var rooms = {};

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 3000;


/**
 * Generates json sent to user on 'sendRooms'
 *
 * return [{name: passwordBool: capacity: occupants: }]
 */
var generateSendRoomsJSON = function()
{
    var obj = new Object();
    obj.rooms = [];

    //rooms.forEach(function(r)

    Object.keys(rooms).forEach(function(key)
    {
        console.log("**************");
        console.log(key);
        if(rooms[key] != null)
        {
            var roomObj = new Object();

            roomObj.name = key;

            if(rooms[key].password == null)
            {
                roomObj.passwordBool = false;
            }
            else
            {
                roomObj.passwordBool = true;
            }
            roomObj.capacity = rooms[key].capacity;
            roomObj.occupants = rooms[key].users.length;

            obj.rooms.push(roomObj);
        }
        else
        {
            console.log("would not tough it with a 10ft pole");
        }
    });

    return obj;
}



app.get('/', function(req, res)
{
    console.log("err");
    res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket)
{
    var p = new Player(socket);

    console.log('A user connected');

    /**
     *Register user nickname/handle (register)	Client => Server
     */
    socket.on('register', function(data)
    {
        console.log(data + " registered");

        //checks for user name in use
        //if(serverUtils.userAvailable(data, players))
        if(!(data in players))
        {
            p.name = data;

            players[data] = p;

            socket.emit('sendRooms', generateSendRoomsJSON());
            console.log("send rooms called");
            //console.log(generateSendRoomsJSON());
        }
        else
        {
            socket.emit('registerFailed', 'User name taken');
            console.log("registration failed sent");
        }

        //console.log(player);
    });

    /**
     *Create Room (createRoom) Client => Server
     * data {password:  , capacity: }
     */
    socket.on('createRoom', function(data)
    {
        console.log(data + "create room");
        // console.log(data);
        // console.log("  ");
        rooms[p.name] = new Room(data.capacity, data.password, p);

        //sends updated room list to all users not in a room
        var dd = generateSendRoomsJSON();

        Object.keys(players).forEach(function(key)
        {
            if(players[key] != null)
            {
                if(players[key].room == null)
                {
                    players[key].socket.emit('sendRooms', dd);
                }
            }
            else
            {
                console.log("player was null Bad!");
            }
        });

    });

    /**
     * Room Selection (joinRoom)	Client => Server
     * data {roomName:  , password: }
     */
    socket.on('joinRoom', function(data)
    {
        console.log(p.name + " joined room " + data.roomName);


        if(rooms[data.roomName] != null && rooms[data.roomName].canJoin(data.password))
        {
            p.room = rooms[data.roomName];
            rooms[data.roomName].addUser(p);

            console.log("user joined room");
        }
        else
        {
            socket.emit('joinFailed', 'Failed connecting to room');
        }
        //console.log(rooms);
    });

    /**
     * data -- literally a string
     */
    socket.on('submitWord', function(data)
    {
        console.log("submitWord called");

        p.selectWord(data).then(function(score)
        {
            p.roundScore = score;
            p.score += score;
            p.submission = data;
            p.room.update();
        })
    });

    //Whenever someone disconnects
    socket.on('disconnect', function ()
    {
        console.log('A user disconnected');

        if(rooms[p.name] != null)
        {
            rooms[p.name] = null;
        }

        //leave the room
        if(p.room != null)
        {
            p.room.removeUser(p);
        }

        //players[p.name] = null;
        delete players[p.name];

    });
});

http.listen(PORT, function()
{
    console.log('listening on *:3000');
});

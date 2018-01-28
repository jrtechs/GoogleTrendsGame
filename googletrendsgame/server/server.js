/**
 * 1-27-18
 *
 * Main server file which handles users, rooms -- everythang
 */

//eh?
const serverUtils = require('./serverUtils.js');

//used for the getting the word array
const utils = require("./utils.js");

//gets the trending data
const trendingAPI = require("./trendsAPI.js");

/**
 * Object used for storing rooms
 * @param capacityP -- the number of people that can be in room
 * @param pass -- the room password -- null if none
 * @param owner -- the person who is creating the room
 */
var room = function(capacityP, pass, owner)
{
    //max capacity of room -- default is 4 for now
    this.capacity = capacityP;

    //name of the room
    this.roomName = owner.name;

    //list of words used in the game
    //7 for now will change later to be room specific
    this.words = utils.getRandomWords(7);

    this.currentWord = this.words.pop();

    //list players -- so we can push requests to them
    this.users = [];

    //increments when rounds pass
    this.currentRound = 0;

    // the password of the room -- null if no password
    this.password = null;

    /**
     1 = Waiting for users
     2 = Word shown, Waiting for response from users
     3 = Showing Result
     4 = Game Over, Display Final Results
    */
    this.state = 1;

    /**
     * creates json to send in the 'roomUpdate' socket event
     *
     * {users: gameState: roundWinner: currentWord: }
     */
    this.generateRoomUpdate = function()
    {
        var result = new Object();

        result.users = [];

        this.users.forEach(function(u)
        {
            result.users.push(u.genJASON());
        });

        //sort the users based on score
        var countOuter = 0;
        var countInner = 0;
        var countSwap = 0;

        var swapped;
        do
        {
            countOuter++;
            swapped = false;
            for(var i = 0; i < result.users.length; i++)
            {
                countInner++;
                if(result.users[i].score && result.users[i + 1].score &&
                    result.users[i].score > result.users[i + 1].score)
                {
                    countSwap++;
                    var temp = result.users[i];
                    result.users[i] = result.users[j];
                    result.users[j] = temp;
                    swapped = true;
                }
            }
        } while(swapped);


        result.gameState = this.state;


        //sets round winner
        var rWinner = -1;

        for(var i = 0; i < this.users.length; i++)
        {
            if(rWinner < this.users[i].roundScore)
            {
                result.roundWinner = this.users[i].name;
                rWinner = this.users[i].roundScore;
            }
        }

        result.currentWord = this.currentWord;

        return result;
    }

    /**
     * grabs roomUpdate json and beams it to every user in the channel
     */
    this.sendRoomUpdate = function()
    {
        var message = this.generateRoomUpdate();
        this.users.forEach(function(u)
        {
            u.socket.emit('roomUpdate', message);
            console.log(message);
        });
    }

    /**
     * adds a user to a room
     * @param p
     * return 0 if they could join
     */
    this.addUser = function(player)
    {
        console.log("user added");
        //check if room is not full
        this.users.push(player);
        player.room = this;

        if(this.users.length == this.capacity)
        {
            this.state = 2;
        }

        console.log("rooms users");
        console.log(this.users);

        this.sendRoomUpdate();
    }

    this.addUser(owner);


    /**
     * Removes a specific user from the room and adjusts the size of the array
     * if the array is empty, the room closes
     * @param p
     */
    this.removeUser = function(p)
    {
        console.log("remove users fnc called");
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
            delete rooms[this.roomName];
        }

        this.update();
    }

    /**
     * Whether or not a user can join this room -- checks for number of people are
     * already in the room and the password
     * @param p
     * @returns {boolean}
     */
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

    /**
     * starts new round for the room -- called once all the players have submitted
     */
    this.newRound = function()
    {
        if(this.words.length == 0)
        {
            this.state == 4;
        }
        else
        {
            this.currentRound++;
            this.users.forEach(function(u)
            {
                u.sumbission = '';
            });
            this.currentRound = this.words.pop();
            this.state = 2;
        }
        this.sendRoomUpdate();
    }

    //updates room variables
    this.update = function()
    {
        switch(this.state)
        {
            case 1: //waiting for users to join
            {
                if(this.users.length == this.capacity)
                {
                    this.newRound();
                }
                break;
            }
            case 2: // waiting for responses
            {
                var flag = true;
                this.users.forEach(function(u)
                {
                    if(u.sumbission === '')
                    {
                        flag = false;
                    }
                });
                if(flag)
                {
                    this.state =3;

                    setTimeout(function() {
                        this.newRound();
                    }, 4000);
                }
                break;
            }
            case 3: // showing results -- time out fnc
            {
                console.log("error &&&&&&&&&&&&&&&&&&");
                break;
            }
            case 4: //game over display final result
            {
                break;
            }
            default:
            {
                console.log("You don goof up")
            }
        }
        this.sendRoomUpdate();
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

    //the word the user selected for current round
    this.sumbission = '';

    this.roundScore = 0;

    /**
     * generate the json object used in 'roomUpdate' socket io event
     *
     * return {name: score: word:}
     */
    this.genJASON = function()
    {
        var result = new Object();
        result.name = this.name;
        result.score = this.score;
        result.word = this.sumbission;
    }

    /**
     * data -- literally a string
     * @param data
     */
    this.selectWord = function(data)
    {
        this.sumbission = data;

        trendingAPI.getPopularity(data + " " + this.room.currentWord).then(function(result)
        {
            this.roundScore = result;
            this.score += result;
            console.log("api result for " + result);
            this.room.update();
        })
    }
}


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

//list of all players --accessed using names like a dic
var players = {};

//list of all the rooms
var rooms = {};

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000;


//Whenever someone connects this gets executed
io.on('connection', function(socket)
{
    var p = new player(socket);

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
            p.name = data;

            players[data] = p;

            socket.emit('sendRooms', generateSendRoomsJSON());
            console.log("send rooms called");
            console.log(generateSendRoomsJSON());
        }
        else
        {
            socket.emit('registerFailed', 'User name taken');
            console.log("registration failed sent");
        }

        console.log(player);
    });

    /**
     *Create Room (createRoom) Client => Server
     * data {password:  , capacity: }
     */
    socket.on('createRoom', function(data) {
        console.log("create room event called");
        console.log(data);
        console.log("  ");
        rooms[p.name] = new room(data.capacity, data.password, p);

    });

    /**
     * Room Selection (joinRoom)	Client => Server
     * data {roomName:  , password: }
     */
    socket.on('joinRoom', function(data) {
        console.log("join room event called");
        console.log(data);
        console.log("  ");

        console.log(rooms);

        if(rooms[data.roomName] != null && rooms[data.roomName].canJoin(data.password))
        {
            rooms[data.roomName].addUser(p);
            console.log("user joined room");
        }
        else
        {
            socket.emit('joinFailed', 'Failed connecting to room');
        }
        console.log(rooms);
    });

    /**
     * data -- literally a string
     */
    socket.on('submitWord', function(data) {
        console.log("submitWord called");
        console.log(data);
        console.log("  ");

        p.selectWord(data);
    });

    //Whenever someone disconnects
    socket.on('disconnect', function () {
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

http.listen(port, function() {
    console.log('listening on *:3000');
});
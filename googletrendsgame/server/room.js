/**
 * Object used for storing rooms
 * @param capacityP -- the number of people that can be in room
 * @param pass -- the room password -- null if none
 * @param owner -- the person who is creating the room
 */

//used for the getting the word array
const utils = require("./utils.js");



class Room
{
    //max capacity of room -- default is 4 for now
    var capacity;

//name of the room
    var roomName;

//list of words used in the game
//7 for now will change later to be room specific
    var words = utils.getRandomWords(7);

    var currentWord = words.pop();

//list players -- so we can push requests to them
    var users = [];

//increments when rounds pass
    var currentRound = 0;

// the password of the room -- null if no password
    var password;

    /**
     1 = Waiting for users
     2 = Word shown, Waiting for response from users
     3 = Showing Result
     4 = Game Over, Display Final Results
     */
    var state = 1;
}

module.exports  =
    {
        /**
         * Constructor for the module to initialise variables
         * @param capacityP
         * @param pass
         * @param owner
         */
        createRoom: function(capacityP, pass, owner)
        {
            this.addUser(owner);
            password = pass;
            capacity = capacityP;
            roomName = owner.name;
        },

        /**
         * creates json to send in the 'roomUpdate' socket event
         *
         * {users: gameState: roundWinner: currentWord: }
         */
        generateRoomUpdate: function()
        {
            var result = new Object();

            result.users = [];

            users.forEach(function(u)
            {
                result.users.push(u.genJASON());
            });

            //sort the users based on score
            var countOuter = 0;
            var countInner = 0;
            var countSwap = 0;

            // var swapped;
            // do
            // {
            //     countOuter++;
            //     swapped = false;
            //     for(var i = 0; i < result.users.length; i++)
            //     {
            //         countInner++;
            //         if(result.users[i].score && result.users[i + 1].score &&
            //             result.users[i].score > result.users[i + 1].score)
            //         {
            //             countSwap++;
            //             var temp = result.users[i];
            //             result.users[i] = result.users[j];
            //             result.users[j] = temp;
            //             swapped = true;
            //         }
            //     }
            // } while(swapped);


            result.gameState = state;


            //sets round winner
            var rWinner = -1;

            for(var i = 0; i < users.length; i++)
            {
                if(rWinner < users[i].roundScore)
                {
                    result.roundWinner = users[i].name;
                    rWinner = users[i].roundScore;
                }
            }

            result.currentWord = currentWord;

            return result;
        },

        /**
         * grabs roomUpdate json and beams it to every user in the channel
         */
        sendRoomUpdate: function()
        {
            var message = this.generateRoomUpdate();
            this.users.forEach(function(u)
            {
                //console.log("room update called");
                u.socket.emit('roomUpdate', message);
                //console.log(message);
            });
        },
        /**
         * adds a user to a room
         * @param p
         * return 0 if they could join
         */
        addUser: function(player)
        {
            //console.log("user added");
            //check if room is not full
            this.users.push(player);
            player.room = this;

            if(this.users.length == this.capacity)
            {
                this.state = 2;
            }

            console.log("user added to room " + player.name);
            //console.log(this.users);

            this.update();
        },

        /**
         * Removes a specific user from the room and adjusts the size of the array
         * if the array is empty, the room closes
         * @param p
         */
        removeUser: function(p)
        {
            console.log("remove users fnc called");
            var temp = new Array();

            for(var i = 0; i < temp.length; i++)
            {
                if(p.name === users[i].name)
                {

                }
                else
                {
                    temp.push(users[i]);
                }
            }

            users = temp;

            //if room is empty remove the room from rooms list
            if(users.length == 0)
            {
                console.log("room scrubbed");
                delete rooms[roomName];
            }

            this.update();
        },

        /**
         * Whether or not a user can join this room -- checks for number of people are
         * already in the room and the password
         * @param p
         * @returns {boolean}
         */
        canJoin: function(p)
        {
            if(password == null)
            {
                return (users.length < capacity);
            }
            else
            {
                return (users.length < capacity) && (p === password);
            }
        },
        /**
         * starts new round for the room -- called once all the players have submitted
         */
        newRound: function()
        {
            console.log("new round started");
            if(words.length == 0)
            {
                state == 4;
            }
            else
            {
                currentRound++;
                users.forEach(function(u)
                {
                    u.submission = '';
                });
                currentWord = words.pop();
                state = 2;
            }
            this.sendRoomUpdate();
        },
        //updates room variables
        update: function()
        {
            switch(state)
            {
                case 1: //waiting for users to join
                {
                    if(users.length == capacity)
                    {
                        this.newRound();
                    }
                    break;
                }
                case 2: // waiting for responses
                {
                    var flag = true;
                    var test = "";
                    users.forEach(function(u)
                    {
                        test+=u.submission;
                        if(u.submission === '')
                        {
                            flag = false;
                        }
                    });
                    console.log("big stuff " + test);
                    if(flag)
                    {
                        state = 3;
                        this.newRound();
                        // setTimeout(function() {
                        //
                        // }, 4000);
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
                    //sqlStuff.dumpRoom(this);
                    break;
                }
                default:
                {
                    console.log("You don goof up")
                }
            }
            console.log(state + " state");
            this.sendRoomUpdate();
        }
    };

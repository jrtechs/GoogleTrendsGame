//used for the getting the word array
const utils = require("./utils.js");

/**
 * Object used for storing rooms
 * @param capacityP -- the number of people that can be in room
 * @param pass -- the room password -- null if none
 * @param owner -- the person who is creating the room
 */
class Room
{

    constructor(capacityP, pass, owner)
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
        this.password = pass;

        /**
         1 = Waiting for users
         2 = Word shown, Waiting for response from users
         3 = Showing Result
         4 = Game Over, Display Final Results
         */
        this.state = 1;

        this.addUser(owner);
    }


    /**
     * generate the json object used in 'roomUpdate' socket io event
     *
     * return {name: score: word:}
     */
    genJASON()
    {
        var result = new Object();
        result.name = this.roomName;
        result.users = this.users;

        return result;
    }

    /**
     * creates json to send in the 'roomUpdate' socket event
     *
     * {users: gameState: roundWinner: currentWord: }
     */
    generateRoomUpdate()
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
     * adds a user to a room
     * @param p
     * return 0 if they could join
     */
    addUser(player)
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
    }




    /**
     * Removes a specific user from the room and adjusts the size of the array
     * if the array is empty, the room closes
     * @param p
     */
    removeUser(p)
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
            console.log("room scrubbed");
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
    canJoin(p)
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
    newRound()
    {
        console.log("new round started");
        if(this.words.length == 0)
        {
            this.state == 4;
        }
        else
        {
            this.currentRound++;
            this.users.forEach(function(u)
            {
                u.submission = '';
            });
            this.currentWord = this.words.pop();
            this.state = 2;
        }
        this.sendRoomUpdate();
    }

    //updates room variables
    update()
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
                var test = "";
                this.users.forEach(function(u)
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
                    this.state = 3;
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
        console.log(this.state + " state");
        this.sendRoomUpdate();
    }
}

module.exports = Room;
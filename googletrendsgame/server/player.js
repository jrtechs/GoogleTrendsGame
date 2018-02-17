//gets the trending data
const trendingAPI = require("./trendsAPI.js");

class Player
{

    constructor(s)
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
        this.submission = '';

        this.roundScore = 0;

        //logs the user data so we can record it to data base at end of round
        this.log = [];
    }

    /**
     * generate the json object used in 'roomUpdate' socket io event
     *
     * return {name: score: word:}
     */
    genJASON()
    {
        var result = new Object();
        result.name = this.name;
        result.score = this.score;
        result.word = this.submission;

        return result;
    }

    /**
     * data -- literally a string
     * @param data
     */
    selectWord(data)
    {
        var w = data + " " + this.room.currentWord;
        this.submission = data;

        //console.log(w);

        this.room.update();

        return new Promise(function(resolve, reject)
        {
            trendingAPI.getPopularity(w).then(function(result)
            {
                console.log("api result for " + result + w);
                resolve(result);
            }).catch(function(err){
                console.log(err);
            })
        });


    }
}

module.exports = Player;

var fs = require('fs');
const WORD_FILE_PATH = '../word_selection/words.txt';

//loads words from word file
var words = [];
var data = fs.readFileSync(WORD_FILE_PATH, 'utf8');
var lines = data.split('\n');
lines.forEach(function(element){
  words.push(element);
});

module.exports=
    {
        /**
         * returns a specific amount of words -- unique
         * @param num the number of words
         * @returns {Array} the random, unique words
         */
        getRandomWords : function(num)
        {
          var rwords = [];
            for(var i = 0; i < num; ++i){
              var randindex = Math.round((Math.random() * (words.length - 1)));
              var newword = words[randindex];
              var uniq = true;
              rwords.forEach(function(element){
                if(newword === element){
                  --i;
                  uniq = false;
                }
              });
              if(uniq)rwords.push(newword);
            }
            return rwords;
        }
    };

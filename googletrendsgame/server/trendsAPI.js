const googt = require('google-trends-api');
const Promise = require('promise');
const DAY = 1000 * 60 * 60 * 24;
module.exports=
    {
        /*
        desc: returns an integer score for the word over the day
        */
        getPopularity: function(word)
        {
            //must be a promise since call to trends API is async
            return new Promise(function(resolve, reject){

            //specifies the keyword, time interval, and granularity
            googt.interestOverTime({keyword:word,
              startTime:new Date(Date.now() - DAY),granularTimeResolution:true})
              .then(function(results){
                //turn into json object
                data = JSON.parse(results).default.timelineData;

                //add up values
                var total = 0;
                data.forEach(function(element){
                  console.log(element.formattedTime + " " + element.value[0]);
                  total += element.value[0];
                })

                //tell function to return
                resolve(total);
              }).catch(function(err){
                reject("Google Trends Query Failed");
              });
            });
        }
     };

const googt = require('google-trends-api');
const Promise = require('promise');
const DAY = 1000 * 60 * 60 * 24; // 1 day in milliseconds
const YEAR = DAY * 365; // 1 year in milliseconds
const GEO = 'US'; //the scope of the trends


/**
desc: helper function for getYearStats, gets list of popularity for days in
the month.
*/
function getMonthStats(word, month){

  return new Promise(function(resolve, reject){
    //set up query for 1 month length
    googt.interestOverTime({
      keyword:word,
      startTime:new Date(Date.now() - (YEAR * month/12)),
      endTime:new Date(Date.now() - (YEAR * (month-1)/12))
    }).then(function(results){
      //parse the json, fill return array w tuples of date + value
      var times = JSON.parse(results).default.timelineData;
      var ret = [];
      for(var i = 0; i < times.length; ++i){
        var tup = new Object();
        tup.time = times[i].formattedTime;
        tup.value = times[i].value[0];
        ret[i] = tup;

      }
      resolve(ret);
    });
  });
}

module.exports=
    {
        /*
        desc: returns an integer score for the word over the day
        */
        getPopularity: function(word)
        {
            //must be a promise since call to trends API is async
            return new Promise(function(resolve, reject){

            //specifies the keyword, time interval, granularity, and region
            googt.interestOverTime({keyword:word,
              startTime:new Date(Date.now() - DAY),granularTimeResolution:true,
              geo:GEO
            })
              .then(function(results){
                //turn into json object
                data = JSON.parse(results).default.timelineData;

                //add up values
                var total = 0;
                data.forEach(function(element){
                  total += element.value[0];
                })

                //tell function to return
                  console.log("********************" + total);
                  //pl.selectWord2(total);
                resolve(total);
              }).catch(function(err){
                reject("Google Trends Query Failed");
              });
            });
        },

        /**
        desc: returns a list of tuples (date, value) representing word's
        popularity for the past year
        */
        /*
        getYearStats: async function(word){
          var ret = [];

            for (var i = 9; i > 0; --i) {
              await getMonthStats(word,i).then(function(data){
                ret = ret.concat(data);
              });
              console.log(i);
            }

            return ret;
        }
        */

     };

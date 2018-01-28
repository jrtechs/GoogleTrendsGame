const trends = require('../trendsAPI');
trends.getPopularity('large').then(function(data){
  console.log(data);
});

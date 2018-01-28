const trends = require('./trendsAPI.js');

trends.getYearStats('bitcoin').then(function(data){
  data.forEach(function(element){
    console.log(element);
  });
});

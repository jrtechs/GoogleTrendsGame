# GoogleTrendsGame

Guess the trends beat your friends

![alt text](http://www.devhumor.com/content/uploads/images/August2017/java-javascript.jpg)

## Server dependencies


````
npm init
npm install express
npm install socket.io
npm install mysql
npm install sanitizer
npm install google-trends-api
npm install promise
````

##Database Construction
create database googleTrends;

use googleTrends;

create table users(
  user_id mediumint unsigned not null AUTO_INCREMENT,
  name varchar(30) not null,
  primary key(user_id)
);

create table data(
  data_id mediumint unsigned not null AUTO_INCREMENT,
  user_id mediumint unsigned not null,
  word varchar(100) not null,
  score mediumint not null,
  primary key(data_id)
);


grant all on googleTrends.* to trendingUser@localhost identified by "password";
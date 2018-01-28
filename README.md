# GoogleTrendsGame

Guess the trends beat your friends

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

create table users(
  user_id mediumint unsigned not null AUTO_INCREMENT,
  name varchar(30) not null,
  primary key(user_id)
);

create table data(
  data_id mediumint unsigned not null AUTO_INCREMENT,
  user_id mediumint unsigned not null,
  word varchar(100) not null,
  primary key(data_id)
);

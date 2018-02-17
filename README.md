# GoogleTrendsGame

Guess the trends beat your friends

![alt text](http://www.devhumor.com/content/uploads/images/August2017/java-javascript.jpg)

## Server dependencies


````
npm init -y
npm install --save express morgan
npm install socket.io --save
npm install mysql --save
npm install sanitizer --save
npm install google-trends-api --save
npm install promise --save
npm install async --save

npm install --save-dev babel-cli babel-preset-es2015 rimraf
````

###Configure Babel
```
touch .babelrc
```
In that file put:
````
{
  "presets": ["es2015"]
}
````

##Database Construction

````
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
````

## Socket IO events for server

````

````
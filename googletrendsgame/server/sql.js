const mysql = require('mysql');

const sanitizer = require('sanitizer');

var Promise = require('promise');

const con = mysql.createConnection({
    host: "localhost",
    user: "trendingUser",
    password: "password",
    database: "googleTrends"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

module.exports=
    {
        /**
         * Function used to use insert statements into the database
         *
         * Don't worry, the input gets sanitized
         *
         * @param sqlStatement
         * @return the id of the new record - if there is one
         */
        insert : function(sqlStatement)
        {
            return new Promise(function(resolve, reject)
            {
                con.query(sanitizer.sanitize(sqlStatement), function (err, result)
                {
                    if (err)
                    {
                        console.log(err);
                        resolve(0);
                    }
                    resolve(result.insertId);
                });
            })
        },

        /**
         * Insert all of the user's data into the sql database
         * @param player
         */
        insertData : function(player)
        {
            return new Promise(function(resolve, reject)
            {
                var q = "insert into users(name) values('" + player.name + "')";
                this.insert(q).then(function(keyId)
                {
                    player.log.forEach(function(data)
                    {
                        var q2 = "insert into data(user_id, word, score) values " +
                            "('" + keyId + "','" + data.word + "','" + data.score + "')";

                        this.insert(q2);
                    });
                    resolve();
                })
            })
        },

        dumpRoom: function(room)
        {
            room.users.forEach(function(user)
            {
                this.insertData(user);
            });
        }
    };

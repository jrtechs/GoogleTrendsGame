const mysql = require('mysql');

const sanitizer = require('sanitizer');

var Promise = require('promise');

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
                var q = "";
            })
        }
    };
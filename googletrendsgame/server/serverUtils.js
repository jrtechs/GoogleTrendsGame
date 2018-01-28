module.exports=
    {
        /**
         * Returns a random word
         * @returns {string}
         */
        roomOpen : function(name, rooms)
        {
            rooms.foreach(function(r)
            {
                if(name === r.roomName)
                {
                    return false;
                }
            });
            return true;
        },
        userAvailable : function(name, players)
        {
            // players.foreach(function(p)
            // {
            //     if(name === p.roomName)
            //     {
            //         return false;
            //     }
            // });

            if(players[name] != null)
                return false
            return true;
        },


        getOpenIndex : function(rooms)
        {

        }

    };
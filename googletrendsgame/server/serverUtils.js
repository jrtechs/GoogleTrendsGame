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

        generateSendRoomsJSON : function(rooms)
        {
            var obj = new Object();
            obj.rooms = [];

            rooms.forEach(function(r)
            {
                var roomObj = new Object();

                if(r.password.password == null)
                {
                    roomObj.passwordBool = false;
                }
                else
                {
                    roomObj.passwordBool = r.password;
                }
                roomObj.capacity = r.capacity;
                roomObj.occupents = r.users.length;

                obj.rooms.push(roomObj);

            });

            return obj;
        },

        getOpenIndex : function(rooms)
        {

        }

    };
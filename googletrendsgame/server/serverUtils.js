module.exports=
    {
        userAvailable : function(name, players)
        {
            if(players[name] != null)
                return false
            return true;
        }
    };
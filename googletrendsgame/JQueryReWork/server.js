/** express app */
const express = require("express");

/**session data for login */
const session = require('express-session');


/** used to parse the request URL */
const url = require('url');

const app = express();

const fs = require('fs');


app.use(express.urlencoded());
app.use(express.json());      // if needed
/**Initializes sessions for login */
app.use(session({ secret: "changeWithConfigLater", cookie: { maxAge: 6000000 }}));


var Room  = require("./room");

var Player = require("./player");


//list of all players --accessed using names like a dic
var players = {};

//list of all the rooms
var rooms = {};


const PORT = 5000;


const whiskers = require('whiskers');


function fetchHTMLInTemplateContext(templateContext, templateKey, filename)
{
    templateContext[templateKey] = fetchFile(filename);
}

function fetchFile(filename)
{
    return fs.readFileSync(filename);
}


function fetchLobby(templateContext)
{
    templateContext.rooms = [{name: "test1"},{name: "test2"}];
}

function fetchGame(templateContext)
{

}


function processPage(result, pageHTMLFile, templateFillerFunction)
{
    var templateContext = new Object();


    var promises = [
        fetchFile("./html/mainTemplate.html"),
        templateFillerFunction(templateContext),
        fetchHTMLInTemplateContext(templateContext, "header", "./html/header.html"),
        fetchHTMLInTemplateContext(templateContext, "footer", "./html/footer.html"),
        fetchHTMLInTemplateContext(templateContext, "mainContent", "./html/" + pageHTMLFile)
    ];

    Promise.all(promises).then(function(resultArray)
    {
        result.write(whiskers.render(resultArray[0], templateContext));
        result.end();
    });
}


app.get('/', (requst, result) =>
{
    processPage(result, "home.html", fetchLobby);
});

app.get('/game', (request, result)=>
{
    processPage(result, "game.html", fetchGame);
});


app.get('/lobby', (request, result)=>
{
    processPage(result, "lobby.html", fetchLobby);
});


app.use(express.static('css'));
app.use(express.static('js'));
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

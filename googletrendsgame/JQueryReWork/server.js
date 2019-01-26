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


const PORT = 5000;


const whiskers = require('whiskers');


function fetchHTML(templateContext, templateKey, filename)
{
    templateContext[templateKey] = fs.readFileSync(filename)
}


app.get('/', (requst, result) =>
{
    result.write(fs.readFileSync("./html/home.html"));
    result.end();
});



app.use(express.static('css'));
app.use(express.static('js'));
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

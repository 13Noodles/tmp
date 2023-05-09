const express = require('express');
const get_router = require('./routes_get');
const post_router = require('./routes_post');
const api_router = require('./routes_fetches');

const host = 'localhost';
const port = 8080;

const app = express();

app.set('view engine', 'ejs');
app.set ('views', './templates');

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static('public'));
app.use('/', get_router);
app.use('/', post_router);
app.use('/fetch', api_router);



app.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`);
});

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handleLogin = require('./login.js');
const handleGetPullRequests = require('./getPullRequests.js');


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/login', handleLogin);

app.post('/api/logout', (req, res) => {
    res.clearCookie('login');
    res.sendStatus(200);
});

app.get('/api/pullrequests', handleGetPullRequests);

app.set('port', process.env.PORT);
app.listen(app.get('port'));

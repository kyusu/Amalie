require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Maybe = require('folktale/maybe');

const handleLogin = require('./login.js');
const getPullRequests = require('./getPullRequests.js');


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/login', handleLogin);

app.post('/api/logout', (req, res) => {
    res.clearCookie('login');
    res.sendStatus(200);
});

app.get('/api/pullrequests', (req, res) => {
    Maybe.fromNullable(req.cookies.login).matchWith({
        Just: ({value}) => {
            getPullRequests(value).then(data => res.json(data), error => {
                console.log('index.js', '40', '', error);
                res.sendStatus(500);
            });
        },
        Nothing: () => res.sendStatus(401)
    });
});

app.set('port', process.env.PORT);
app.listen(app.get('port'));

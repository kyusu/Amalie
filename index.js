require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const login = require('./login.js');
const getPullRequests = require('./getPullRequests.js');
const Maybe = require('folktale/maybe');
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/login', (req, res) => {
    const {username, password, server} = req.body;
    const loginObj = {
        username,
        password,
        server
    };
    login(loginObj).then(() => {
        res.cookie('login', loginObj, {
            maxAge: 900000,
            httpOnly: false
        });
        res.sendStatus(200);
    }, (error) => {
        res.sendStatus(error.statusCode);
    });
});

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

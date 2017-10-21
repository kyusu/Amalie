const R = require('ramda');
const {getUserUrl} = require('./restPaths.js');
const {tGet} = require('./taskifiedGet.js');

const getLoginData = R.pick([
    'username',
    'password',
    'server'
]);

const login = ({username, password, server}) => tGet({
    auth: {
        user: username,
        pass: password
    }
}, getUserUrl({
    username,
    server
})).run().promise();

const handleFailedLogin = res => error => res.sendStatus(error.statusCode);

const handleSuccessfulLogin = (loginData, res) => () => {
    res.cookie('authentication', loginData, {
        httpOnly: true
    });
    res.sendStatus(200);
};

const handleLogin = (req, res) => {
    const loginObj = getLoginData(req.body);
    login(loginObj).then(handleSuccessfulLogin(loginObj, res), handleFailedLogin(res));
};

module.exports = handleLogin;

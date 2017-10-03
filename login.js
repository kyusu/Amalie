const {getUserUrl} = require('./restPaths.js');
const {tGet} = require('./taskifiedGet.js');

const login = ({username, password, server}) => tGet({
    auth: {
        user: username,
        pass: password
    }
}, getUserUrl({
    username,
    server
})).run().promise();

module.exports = login;

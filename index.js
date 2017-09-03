require('dotenv').config();
const express = require('express');
const app = express();

app.use((req, res) => {
    res.sendStatus(200);
});

app.set('port', process.env.PORT);
app.listen(app.get('port'));

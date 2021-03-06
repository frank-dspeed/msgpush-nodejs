const express = require('express');
const gci = require('./gcinterceptor');
const app = express();

const PORT = process.env.PORT || 3000;
const USE_GCI = process.env.USE_GCI || 'FALSE';
const MSG_SIZE = process.env.MSG_SIZE || 1024;
const WINDOW_SIZE = process.env.WINDOW_SIZE || 0;
const buffer = new Array();
let msgCount = 0;

if (USE_GCI === 'TRUE') {
    app.use(gci);
}

app.get('/', function (req, res) {
    let byteArray = new Array(MSG_SIZE);
    let i = 0;
    for (i; i < MSG_SIZE; i++) {
        byteArray[i] = i;
    }
    if (WINDOW_SIZE > 0) {
        buffer[msgCount++ % WINDOW_SIZE] = byteArray;
    }
    res.status(200).send();
});

app.listen(PORT, function () {
    console.log('App listening on port ' + PORT + '!');
});

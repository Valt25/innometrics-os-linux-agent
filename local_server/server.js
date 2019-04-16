var express = require('express');
var app = express();
var urls = require('./urls');
var cron = require('cron');
const models = require('./models');
let send_activity = require('./utils/backend');
const proceed_raw = require('./activity_handlers');

send_activity.login();

app.use(express.json());
app.use('', urls);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


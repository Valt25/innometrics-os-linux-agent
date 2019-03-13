var express = require('express');
var app = express();
var urls = require('./urls');
var cron = require('cron');
const models = require('./models');
let send_activity = require('./utils/backend');
const proceed_raw = require('./activity_handlers');

send_activity.login();

var cronJob = cron.job("*/10 * * * * *", function () {
    models.Activity.findAll()
        .then((activities) => {
            activities.forEach((activity) => {
                // console.log(activity);
                let sensor = activity.getSensor();
                proceed_raw(activity, sensor);

            })
        })
});
cronJob.start();
app.use(express.json());
app.use('', urls);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


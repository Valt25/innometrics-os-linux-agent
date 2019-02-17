var express = require('express');
var app = express();
var urls = require('./urls');
var cron = require('cron');
const models = require('./models');
let send_activity = require('./utils/backend');

send_activity.login();

var cronJob = cron.job("*/10 * * * * *", function () {
    models.Activity.findAll()
        .then((activities) => {
            activities.forEach((activity) => {
                // console.log(activity);
                let sensor = activity.getSensor();
                send_activity(activity, sensor)
                    .then((status) => {
                        activity.destroy().then((status) => console.log('ok'));
                    })
                    .catch((err) => {
                        console.log('Not now');
                        console.log(err);
                    });

            })
        })
});
cronJob.start();
app.use(express.json());
app.use('', urls);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


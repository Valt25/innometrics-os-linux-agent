let express = require('express');
let router = express.Router();
const models = require('./models');
let date = require('date-and-time');
let send_activity = require('./utils/backend');

router.post('/sensor/register', function (req, res) {
    var data = req.body;
    console.log(data);
    var token = Math.random().toString(36).substr(2);
    models.Sensor.create({name: data.name, description: data.description, token: token})
        .then((sensor) => {
            console.log(sensor);
            res.send({status: 'success', token: token});
        })
});
router.post('/activity/data', function (req, res) {
    let data = req.body;
    console.log(data);
    const token = req.get('Authorization');
    let start = date.parse(data.start, 'YYYY/MM/DD HH:mm:ss');
    let end = date.parse(data.end, 'YYYY/MM/DD HH:mm:ss');
    console.log(start);
    console.log(end);

    models.Sensor.findOne({ where: {token: token}})
        .then((sensor) => {
            const data = req.body;
            let activity = {
                name: data.name,
                start_time: start,
                end_time: end,
                idle: data.idle
            };
            send_activity(activity, sensor)
                .then((status) => {
                    res.send('sent')
                })
                .catch((err) => {
                    models.Activity.create(activity).then((activity) => {
                        activity.setSensor(sensor, {save: true});
                        res.send('Not sent. Cached');
                    })
                })
        });

});

module.exports = router;
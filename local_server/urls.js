let express = require('express');
let router = express.Router();
const models = require('./models');
const proceed_raw = require('./activity_handlers');
const send_activity = require('./utils/backend');

router.post('/sensor/register', function (req, res) {
    var data = req.body;
    var token = Math.random().toString(36).substr(2);
    models.Sensor.create({name: data.name, description: data.description, token: token})
        .then((sensor) => {
            res.send({status: 'success', token: token});
        })
});


router.post('/activity/data', function (req, res) {
    let data = req.body;
    const token = req.get('Authorization');
    models.Sensor.findOne({where: {token: token}})
        .then((sensor) => {
            proceed_raw(data, sensor);
        });
    res.send("Ok")
});

router.get('/global', function (req, res) {
    models.GlobalState.findByPk(1)
        .then((state) => {
            if (state) {
                res.send({
                    login: state.login,
                    username: state.username
                })
            } else {
                res.status(400).send("Need setup globals at first");
            }
        }).catch(err => console.log('Error in getting global'));
});

router.post('/global', function (req, res) {
    let data = req.body;
    models.GlobalState.findByPk(1)
        .then((state) => {
            if (state) {
                state.update(data)
            } else {
                models.GlobalState.create(data)
            }
            send_activity.login();

        });
    res.send("Ok")
});

router.get('/client/activities', function (req, res) {
    models.Activity.findAll({
        order: [
            ['id', 'DESC'],
        ],
    }).then((activities) => {
        res.send(activities);
    }).catch((err) => {
        res.status(502).send("Error")
    })
});

router.delete('/client/activity/:activityId', function (req, res) {
    const activityId = req.params.activityId;
    models.Activity.destroy({
        where: {id: activityId},
    }).then((result) => {
        res.send("Ok");
    }).catch((err) => {
        res.status(404).send("Not found")
    })
});

router.post('/client/activity/send', function (req, res) {
    models.Activity.findAll()
        .then((activities) => {
            activities.forEach((activity) => {
                try {
                    let sensor = activity.getSensor();
                    proceed_raw(activity, sensor);
                    activity.destroy().then((result) => {
                    }).catch((err) => {
                    })
                } catch (e) {
                    console.log(e)
                }
            });
            res.send("Ok")
        })
});
module.exports = router;

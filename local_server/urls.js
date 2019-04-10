let express = require('express');
let router = express.Router();
const models = require('./models');
const proceed_raw = require('./activity_handlers');

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
    console.log(data.type);
    console.log(data.activity);
    models.Sensor.findOne({where: {token: token}})
        .then((sensor) => {
            proceed_raw(data, sensor);
        });
    res.send("Ok")
});

router.get('/global', function (req, res) {
    console.log('Global request');
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
        }).catch(err => console.log(err));
});

router.post('/global', function (req, res) {
    let data = req.body;
    console.log(data);
    models.GlobalState.findByPk(1)
        .then((state) => {
            if (state) {
                state.update(data)
            } else {
                models.GlobalState.create(data)
            }
        });
    res.send("Ok")

});

module.exports = router;

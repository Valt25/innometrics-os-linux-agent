const axios = require('axios');
const activeWin = require('active-win');
const strftime = require('strftime');
const ioWrapper = require('./utils/io_hook_wrap');
let server_url = 'http://localhost:3000';

let last_window = undefined;
var last_activity = new Date();

var token = undefined;

let sensor = {
    name: 'Window sensor',
    description: 'Sensor that looks at current opened window'
};

function auth_sensor() {
    return axios.post(server_url + '/sensor/register', sensor);
}

function create_activity(window, idle) {
    if (window) {
        console.log(window.begins_at);
        console.log(new Date());
        const data = {
            type: 'active_window',
            data: {
                name: window.window.owner.name,
                start: strftime('%Y/%m/%d %H:%M:%S', window.begins_at),
                end: strftime('%Y/%m/%d %H:%M:%S', new Date()),
                idle: idle,
            }
        };
        axios.post(server_url + '/activity/data', data, {headers: {'Authorization': token}}).then(e => console.log("Success")).catch(e => console.log(e))
    }
}

function proceed_activity(window, idle) {
    if (!token) {
        auth_sensor()
            .then((res) => {
                token = res.data.token;
            })
            .catch((err) => {
                console.log('error');
            });
    }
    create_activity(window, idle);

}

function is_the_same(first) {
    if (first && last_window) {
        return first.owner.name === last_window.window.owner.name;
    } else {
        return false;
    }
}

function check_window() {
    activeWin()
        .then((res) => {
            if (!is_the_same(res)) {
                console.log('Different');
                proceed_activity(last_window, false);
                last_window = {window: res, begins_at: new Date()};
            }

        })
        .catch((err) => {
            console.log(err)
        });
}

const idle_min_duration = 60000;

ioWrapper().subscribe((event) => {
        current_activity = new Date();
        if (current_activity - last_activity > idle_min_duration) {
            proceed_activity(last_window, true)
        }
        last_activity = new Date();
    }
);


let intervalId = setInterval(check_window, 1000);
console.log(intervalId);

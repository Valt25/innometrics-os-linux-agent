const axios = require('axios');
const activeWin = require('active-win');
const strftime = require('strftime');

let server_url = 'http://localhost:3000';

var last_window = undefined;
var token = undefined;

let sensor = {
    name: 'Window sensor',
    description: 'Sensor that looks at current opened window'
};
function auth_sensor() {
    return axios.post(server_url + '/sensor/register', sensor);
}
function create_activity(window) {
        if (window) {
            const data = {
                name: window.window.owner.name,
                start: strftime('%Y/%m/%d %H:%M:%S', window.from),
                end: strftime('%Y/%m/%d %H:%M:%S', new Date()),
            };
            axios.post(server_url + '/activity/data', data, {headers: {'Authorization': token}})
        }
}
function proceed_activity(window) {
    if (!token) {
        auth_sensor()
            .then((res) => {
                token = res.data.token;
            })
            .catch((err) => {
                console.log('error');
            });
    }
    create_activity(window);

}
function is_the_same(first) {
    if (first && last_window){
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
                proceed_activity(last_window);
                last_window = {window: res, begins_at: new Date()};
            }
        })
        .catch((err) => {
            console.log(err)
        });
}

let intervalId = setInterval(check_window, 1000);
console.log(intervalId);
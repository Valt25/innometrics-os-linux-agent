const https = require('https');
const axios = require('axios');
const ip = require("ip");
const mac = require('getmac');
const user = require(__dirname + '/../config/user.json');
const strftime = require("strftime");
const server_conf = require(__dirname + '/../config/server.json');
const backend_url = server_conf.server_url;

const agent = new https.Agent({
    rejectUnauthorized: false
});

mac.getMac(function(err, macAddress){
    if (err)  throw err;
   return macAddress;
});
let jwt_token = undefined;

function login() {
    axios.post(backend_url + '/login', {email: user.email, password: user.password}, {httpsAgent: agent})
        .then((res) => {
            jwt_token = res.data.token;
            // console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
}
// strftime('%Y/%B/%d %H:%M:%S')
module.exports = function send_activity(activity, sensor) {
    if (jwt_token) {
        var local_ip = ip.address();
        var local_mac = 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff';
        const data = {
            executable_name: activity.name,
            activity_type: sensor.name,
            start_time: activity.begin || strftime('%B %d, %Y %H:%M:%S'),
            end_time: activity.end || strftime('%B %d, %Y %H:%M:%S'),
            ip_address: local_ip,
            mac_address: local_mac,
        };
        return axios.post(backend_url + '/activity', {'activity': data}, {headers: {Authorization: jwt_token}, httpsAgent: agent});
    } else {
        login();
    }
};

module.exports.login = () => {
    login();
};
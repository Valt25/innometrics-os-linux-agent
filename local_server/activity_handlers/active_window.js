let send_activity = require('../utils/backend');
let date = require('date-and-time');
const models = require('../models');


function is_input_activity_valid(activity) {

    if (activity.start && activity.end && activity.name) {
        try {
            let start = date.parse(activity.start, 'YYYY/MM/DD HH:mm:ss');
            let end = date.parse(activity.end, 'YYYY/MM/DD HH:mm:ss');
        } catch (e) {
            console.log(e);
            return {
                result: false,
                message: "Start or end fields are not in suitable format('YYYY/MM/DD HH:mm:ss' expected)"
            }
        }
        if (typeof activity.idle != "boolean") {
            return {
                result: false,
                message: "Idle field is not boolean value"
            }
        }

        return {
            result: true,
            message: ""
        }
    }
}

// Here activity assumed valid
function proceed_active_window(activity, sensor) {

    send_activity(activity, sensor)
        .then((status) => {
            return "Sent."
        })
        .catch((err) => {
            db_activity = {
                type: 'active_window',
                data: activity
            };
            models.Activity.create(db_activity).then((activity) => {
                activity.setSensor(sensor, {save: true});
                return "Not sent. Cached"
            })
        })
}

module.exports = {
    is_valid: is_input_activity_valid,
    proceed: proceed_active_window
};

const active_window = require('./active_window');

const handlers = {
    'active_window': active_window
};

function proceed_from_db(activity, sensor) {
    const type = activity.type;
    const data = activity.data;
    const choosen_handler = handlers[type];
    var result = choosen_handler.is_valid(data);
    if (result.result) {
        result = choosen_handler.proceed(data, sensor);
        return {
            code: 200,
            message: result
        }
    } else {
        return {
            code: 400,
            message: result.message
        }
    }
};


function put_to_db(input, sensor) {
    const type = input.type;
    const data = input.data;
    const choosen_handler = handlers[type];
    var result = choosen_handler.is_valid(data);
    if (result.result) {
        result = choosen_handler.to_db(data, sensor);
        return {
            code: 200,
            message: result
        }
    } else {
        return {
            code: 400,
            message: result.message
        }
    }
}

module.exports = {
  put_to_db,
  proceed_from_db
};

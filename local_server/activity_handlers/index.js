const active_window = require('./active_window');

const handlers = {
    'active_window': active_window
};

module.exports = function proceed_raw_activity(input, sensor) {
    const type = input.type;
    const data = input.data;
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

'use strict';
module.exports = (sequelize, DataTypes) => {
    const GlobalState = sequelize.define('GlobalState', {
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        username: DataTypes.STRING,
    }, {});
    return GlobalState;
};

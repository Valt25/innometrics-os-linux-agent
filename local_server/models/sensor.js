'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sensor = sequelize.define('Sensor', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    token: DataTypes.STRING,
    last_usage: DataTypes.DATE,
    created: DataTypes.DATE
  }, {});
  Sensor.associate = function(models) {
    // associations can be defined here
  };
  return Sensor;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    begin: DataTypes.DATE,
    end: DataTypes.DATE,
    ip_address: DataTypes.STRING,
    mac_address: DataTypes.STRING,
  }, {});
  Activity.associate = function(models) {
    Activity.belongsTo(models.Sensor);
  };
  return Activity;
};
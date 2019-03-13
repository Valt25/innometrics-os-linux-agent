'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    type: DataTypes.STRING,
    data: DataTypes.JSON
  }, {});
  Activity.associate = function(models) {
    Activity.belongsTo(models.Sensor);
  };
  return Activity;
};
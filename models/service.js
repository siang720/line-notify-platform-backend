'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    clientId: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Service.associate = function (models) {
    Service.belongsTo(models.User)
    Service.hasMany(models.Token)
  };
  return Service;
};
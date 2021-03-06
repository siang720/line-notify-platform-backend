'use strict';
module.exports = (sequelize, DataTypes) => {
  const HistoricalMessage = sequelize.define('HistoricalMessage', {
    message: DataTypes.STRING,
    sendTime: DataTypes.DATE,
    ServiceId: DataTypes.INTEGER,
    sendNum: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    failNum: DataTypes.INTEGER
  }, {});
  HistoricalMessage.associate = function (models) {
    HistoricalMessage.belongsTo(models.Service)
    HistoricalMessage.belongsTo(models.User)
  };
  return HistoricalMessage;
};
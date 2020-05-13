'use strict';
module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
    message: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Draft.associate = function (models) {
    Draft.belongsTo(models.User)
  };
  return Draft;
};
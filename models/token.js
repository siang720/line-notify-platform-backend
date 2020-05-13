'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    access_token: DataTypes.STRING,
    ServiceId: DataTypes.INTEGER
  }, {});
  Token.associate = function (models) {
    Token.belongsTo(models.Service)
  };
  return Token;
};
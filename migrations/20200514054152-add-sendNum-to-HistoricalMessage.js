'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('HistoricalMessages', 'sendNum', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('HistoricalMessages', 'sendNum');
  }
};

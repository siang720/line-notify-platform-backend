'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('HistoricalMessages', 'failNum', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('HistoricalMessages', 'failNum');
  }
};

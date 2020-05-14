'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Services', 'subscriptURL', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('Services', 'callbackURL', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ])

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Services', 'subscriptURL'),
      queryInterface.removeColumn('Services', 'callbackURL')
    ])
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Tokens', [{
      access_token: 'ZObFFNrzO7xVlxmRnVuGHxAsGXFMRNZufIMJ1IFJMng',
      ServiceId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      access_token: 'KD7q7msCjAZWQuwwSs0mcutCIObkppS2QfaDxETZNcx',
      ServiceId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Token', null, {});
  }
};

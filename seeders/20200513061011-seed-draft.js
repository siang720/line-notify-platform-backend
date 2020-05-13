'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Drafts', [{
      message: 'test 1 message for user 1',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      message: 'test 2 message for user 1',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      message: 'test 1 message for user 2',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      message: 'test 2 message for user 2',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Draft', null, {});
  }
};

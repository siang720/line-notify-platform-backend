'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('HistoricalMessages', [{
      message: 'his Msg 1',
      sendTime: new Date(),
      ServiceId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      message: 'his Msg 2',
      sendTime: new Date(),
      ServiceId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('HistoricalMessage', null, {});
  }
};

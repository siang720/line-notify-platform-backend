'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Services', [{
      name: 'AI投資小幫手',
      clientId: '2WTIpO7PB5jBVvOGN2Foli',
      clientSecret: 'F1E1P4jSjezlG54m9KM3PZqw3Kh3nutq53CDoCEDuSH',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Notify測試一',
      clientId: '6MZ8X4qKJZ6XvX0aztO3uy',
      clientSecret: 'WyX6R8GWQbXeEpTipEu7BJRnMMEVSkS22U2rdFZUjQi',
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Service', null, {});
  }
};

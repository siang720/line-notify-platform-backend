'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Services', [{
      name: 'AI投資小幫手',
      clientId: '2WTIpO7PB5jBVvOGN2Foli',
      clientSecret: 'F1E1P4jSjezlG54m9KM3PZqw3Kh3nutq53CDoCEDuSH',
      UserId: 1,
      subscriptURL: "https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=2WTIpO7PB5jBVvOGN2Foli&redirect_uri=http://localhost:3000/services/1/callback&scope=notify&state=state",
      callbackURL: "http://localhost:3000/services/1/callback",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Notify測試一',
      clientId: '6MZ8X4qKJZ6XvX0aztO3uy',
      clientSecret: 'WyX6R8GWQbXeEpTipEu7BJRnMMEVSkS22U2rdFZUjQi',
      UserId: 2,
      subscriptURL: "https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=6MZ8X4qKJZ6XvX0aztO3uy&redirect_uri=http://localhost:3000/services/2/callback&scope=notify&state=state",
      callbackURL: "http://localhost:3000/services/2/callback",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Service', null, {});
  }
};

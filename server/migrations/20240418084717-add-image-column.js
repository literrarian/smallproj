'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn('games', 'img', {
    //   type: Sequelize.STRING 
    // });
    await queryInterface.addColumn('game_details', 'img', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('meetings', 'img', {
      type: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('games', 'img');
    await queryInterface.removeColumn('game_details', 'img');
    await queryInterface.removeColumn('meetings', 'img');
  }
};

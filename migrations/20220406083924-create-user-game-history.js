'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diamon: {
        type: Sequelize.INTEGER
      },
      tiket: {
        type: Sequelize.INTEGER
      },
      battle_point: {
        type: Sequelize.INTEGER
      },
      item: {
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.DATE
      },
      logout: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId:{
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_histories');
  }
};
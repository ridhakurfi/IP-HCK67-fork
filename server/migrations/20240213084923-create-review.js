'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.INTEGER
      },
      FoodId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Food",
          },
          key: "id",
        },
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "User",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
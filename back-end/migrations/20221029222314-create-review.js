"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("review", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subscriptionId: {
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "subscription",
          key: "id",
        },
      },
      comment: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      commentDisclaimer: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("review");
  },
};

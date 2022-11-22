"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lesson", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacherId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      title: {
        type: Sequelize.DataTypes.STRING,
      },
      subject: {
        type: Sequelize.DataTypes.STRING,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
      },
      frequency: {
        type: Sequelize.DataTypes.STRING,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
      },
      cost: {
        type: Sequelize.DataTypes.FLOAT,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      },
      duration: {
        type: Sequelize.DataTypes.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("lesson");
  },
};

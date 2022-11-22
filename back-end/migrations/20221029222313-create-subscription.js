"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("subscription", {
        id: {
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        lessonId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "lesson",
            key: "id",
          },
        },
        studentId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "user",
            key: "id",
          },
        },
        timeframeFrom: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        timeframeTo: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        message: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      })
      .then(() =>
        queryInterface.addIndex("subscription", ["lessonId", "studentId"], {
          unique: true,
        })
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subscription");
  },
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'user',
          key: 'id'
        },
        primary: {
          type: Sequelize.STRING
        },
        universitary: {
          type: Sequelize.DataTypes.STRING
        },
        secundary: {
          type: Sequelize.DataTypes.STRING
        },
        terciary: {
          type: Sequelize.DataTypes.STRING
        },
        birth_date: {
          type: Sequelize.DataTypes.DATE
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student');
  }
};
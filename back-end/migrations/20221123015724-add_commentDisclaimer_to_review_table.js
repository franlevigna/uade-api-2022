"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    Promise.all([
      queryInterface.addColumn(
        "lesson", // table name
        "createdAt", // new field name
        {
          type: Sequelize.DATE,
          allowNull: true,
        }
      ),
      queryInterface.addColumn("lesson", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("lesson", "createdAt"),
      queryInterface.removeColumn("lesson", "updatedAt"),
    ]);
  },
};

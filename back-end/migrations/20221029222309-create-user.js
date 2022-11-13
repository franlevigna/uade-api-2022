'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_type: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            phone_number: {
                type: Sequelize.STRING
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            primary: {
                type: Sequelize.STRING
            },
            universitary: {
                type: Sequelize.STRING
            },
            secundary: {
                type: Sequelize.STRING
            },
            terciary: {
                type: Sequelize.STRING
            },
            birth_date: {
                type: Sequelize.DATE
            },
            experience: {
                type: Sequelize.STRING
            },
            degree: {
                type: Sequelize.STRING
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    }
};
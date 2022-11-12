'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('subscription', {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            lesson_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'lesson',
                    key: 'id'
                }
            },
            student_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'student',
                    key: 'id'
                }
            },
            timeframe_from: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            timeframe_to: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            message: {
                allowNull: false,
                type: Sequelize.STRING,
            }
        }).then(() => queryInterface.addIndex('subscription', ['lesson_id', 'student_id'], {unique: true}));
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('subscription');
    }
};
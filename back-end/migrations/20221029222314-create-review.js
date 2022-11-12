'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('review', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            subscription_id: {
                unique: true,
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'subscription',
                    key: 'id'
                }
            },
            comment: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.DataTypes.STRING
            },
            created_at: {
                type: Sequelize.DataTypes.DATE
            },
            updated_at: {
                type: Sequelize.DataTypes.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('review');
    }
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        phone_number: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        primary: {
            type: DataTypes.STRING
        },
        universitary: {
            type: DataTypes.STRING
        },
        secundary: {
            type: DataTypes.STRING
        },
        terciary: {
            type: DataTypes.STRING
        },
        birth_date: {
            type: DataTypes.DATE
        },
        experience: {
            type: DataTypes.STRING
        },
        degree: {
            type: DataTypes.STRING
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
    }, {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
        timestamps: false,
    });
    return User;
};
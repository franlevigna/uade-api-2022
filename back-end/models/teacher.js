'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Teacher.belongsTo(models.user, {as: 'user', foreignKey: 'user_id'})
        }
    }

    Teacher.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            unique: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        experience: {
            type: DataTypes.STRING
        },
        degree: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'teacher',
    });
    return Teacher;
};
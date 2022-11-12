'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.user, {foreignKey: 'user_id'})
    }
  }
  Student.init({
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
    phone_number: {
      allowNull: false,
      type: DataTyes.STRING,
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
    }
  }, {
    sequelize,
    modelName: 'student',
  });
  return Student;
};
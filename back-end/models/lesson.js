"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.user, { foreignKey: "teacherId" });
      Lesson.hasMany(models.subscription, { foreignKey: "lessonId" });
    }
  }
  Lesson.init(
    {
      teacherId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      subject: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      frequency: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.FLOAT,
      },
      description: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "lesson",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Lesson;
};

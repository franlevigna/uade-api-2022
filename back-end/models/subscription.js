"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription.belongsTo(models.lesson, { foreignKey: "lesson_id" });
      Subscription.belongsTo(models.user, { foreignKey: "student_id" });
    }
  }
  Subscription.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      student_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      lesson_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      timeframe_from: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      timeframe_to: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "subscription",
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["student_id", "lesson_id"],
        },
      ],
    }
  );
  return Subscription;
};
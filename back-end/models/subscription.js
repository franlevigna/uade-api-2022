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
      Subscription.belongsTo(models.lesson, { foreignKey: "lessonId" });
      Subscription.belongsTo(models.user, { foreignKey: "studentId" });
      Subscription.hasOne(models.review, { foreignKey: "subscriptionId" });
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
      studentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      lessonId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      timeframeFrom: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      timeframeTo: {
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
          fields: ["studentId", "lessonId"],
        },
      ],
    }
  );
  return Subscription;
};

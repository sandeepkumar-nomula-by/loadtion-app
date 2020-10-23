"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Money_Values extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Money_Values.init(
    {
      treasure_id: DataTypes.INTEGER,
      amt: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Money_Values",
      timestamps: false,
    }
  );
  return Money_Values;
};

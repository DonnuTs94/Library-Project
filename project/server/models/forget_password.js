"use strict"
const { Model, BOOLEAN } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Forget_Password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Forget_Password.belongsTo(models.User)
    }
  }
  Forget_Password.init(
    {
      id_forget: DataTypes.STRING,
      expiration_link: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      forgot_success: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Forget_Password",
    }
  )
  return Forget_Password
}

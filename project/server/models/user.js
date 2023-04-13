"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Roles)
      User.hasMany(models.Forget_Password)
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      id_picture: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      gender: DataTypes.STRING,
      otp: DataTypes.STRING,
      expiration_time: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        // allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      updatedAt: false,
    }
  )
  return User
}

"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Book_Pictures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book_Pictures.belongsTo(models.Books)
    }
  }
  Book_Pictures.init(
    {
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book_Pictures",
      timestamps: false,
    }
  )
  return Book_Pictures
}

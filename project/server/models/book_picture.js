"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Book_Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book_Picture.belongsTo(models.Books)
    }
  }
  Book_Picture.init(
    {
      book_picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book_Picture",
    }
  )
  return Book_Picture
}

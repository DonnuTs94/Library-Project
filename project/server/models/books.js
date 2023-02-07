"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books.belongsTo(models.User)
      Books.belongsTo(models.Categories)
      Books.hasMany(models.Book_Picture)
      Books.hasMany(models.Books_Stock)
    }
  }
  Books.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Books",
    }
  )
  return Books
}

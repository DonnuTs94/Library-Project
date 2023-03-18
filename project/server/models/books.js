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

      Books.belongsTo(models.Categories)
      Books.hasMany(models.Book_Pictures)
      Books.hasMany(models.Book_Stocks, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Books.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Books",
      paranoid: true,
      deletedAt: true,
      createdAt: false,
      updatedAt: false,
    }
  )
  return Books
}

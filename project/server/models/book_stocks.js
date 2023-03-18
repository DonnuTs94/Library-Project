"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Book_Stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book_Stocks.belongsTo(models.Books, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Book_Stocks.init(
    {
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      // defaultValue: "0",
    },
    {
      sequelize,
      modelName: "Book_Stocks",
      timestamps: false,
    }
  )
  return Book_Stocks
}

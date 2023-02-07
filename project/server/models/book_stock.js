"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Books_Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books_Stock.belongsTo(models.Books)
    }
  }
  Books_Stock.init(
    {
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Books_Stock",
    }
  )
  return Books_Stock
}

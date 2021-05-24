'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    value: DataTypes.DECIMAL,
    factor: DataTypes.ENUM('A', 'B', 'C')
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
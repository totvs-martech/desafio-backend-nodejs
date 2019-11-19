'use strict'

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    factor: {
      type: DataTypes.ENUM,
      values: ['A', 'B', 'C']
    }
  }, {})
  Products.associate = function(models) {
    // associations can be defined here
  }
  return Products
}

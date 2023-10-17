'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoodsParts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GoodsParts.init({
    goods_manufacturer: DataTypes.STRING,
    price: DataTypes.NUMBER,
    goods_parts_manufacturer: DataTypes.STRING,
    vendor_code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    images: DataTypes.STRING,
    in_stock: DataTypes.NUMBER,
    bestseller: DataTypes.BOOLEAN,
    new: DataTypes.BOOLEAN,
    popularity: DataTypes.NUMBER,
    compatibility: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'GoodsParts',
  });
  return GoodsParts;
};
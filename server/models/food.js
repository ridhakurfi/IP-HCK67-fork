'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.hasMany(models.Review, { foreignKey: "id" });
      Food.belongsTo(models.Restaurant, { foreignKey: "id" });
      // define association here
    }
  }
  Food.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    RestoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};
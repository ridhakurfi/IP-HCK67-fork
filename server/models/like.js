'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: "id" });
      Like.belongsTo(models.Review, { foreignKey: "id" });
      // define association here
    }
  }
  Like.init({
    liked: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    ReviewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
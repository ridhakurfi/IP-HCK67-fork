'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(models.Like, { foreignKey: "id" });
      Review.belongsTo(models.Food, { foreignKey: "FoodId" });
      Review.belongsTo(models.User, { foreignKey: "UserId" });
      // define association here
    }
  }
  Review.init({
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Review is required",
        },
        notEmpty: {
          args: true,
          msg: "Review is required",
        }
      },
    },
    score: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Score is required",
        },
        notEmpty: {
          args: true,
          msg: "Score is required",
        },
      },
    },
    FoodId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
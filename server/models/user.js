'use strict';
const { hasher } = require("../helpers/bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Review, { foreignKey: "id" });
      User.hasMany(models.Like, { foreignKey: "id" });
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username cannot empty",
        },
        notEmpty: {
          args: true,
          msg: "Username cannot empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "Email cannot be empty",
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty",
        },
        isEmail: {
          args: true,
          msg: "Invalid email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot empty",
        },
        notEmpty: {
          args: true,
          msg: "Password cannot empty",
        },
      },
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Rank cannot empty",
        },
        notEmpty: {
          args: true,
          msg: "Rank cannot empty",
        },
      },
    },
  }, {
    hooks: {
      beforeCreate: function (user) {
        user.password = hasher(user.password);
      },
    },
    beforeBulkCreate: function (users) {
      users.forEach((r) => {
        r.password = hasher(r.password);
      });
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
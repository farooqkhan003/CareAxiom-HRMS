"use strict";

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [10, 30]
        // startsWithUpper: function (nameStr) {
        //   var first = nameStr.charAt(0);
        //   var startsWithUpper = first === first.toUpperCase();
        //   if(!startsWithUpper)
        //     throw new Error('First letter must be a uppercase letter');
        // }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
      validate: {
        len: [5, 20]
        // is: ["^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$", 'i']
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    // deletedAt: 'deleted_at',
    // paranoid: true,
    freezeTableName: true,

    hooks: {
      afterValidate: function (user) {
        user.password = bcrypt.hashSync(user.password, 8);
      }
    }
  });

  return User;
};
"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserDepartment = sequelize.define('UserDepartment', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    department_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'Department',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return UserDepartment;
};
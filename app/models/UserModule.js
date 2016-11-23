"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserModule = sequelize.define('UserModule', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    module_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'Module',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return UserModule;
};
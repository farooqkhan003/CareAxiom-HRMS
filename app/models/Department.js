"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define('Department', {
    department: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    // deletedAt: 'deleted_at',
    // paranoid: true,
    freezeTableName: true
  });

  return Department;
};
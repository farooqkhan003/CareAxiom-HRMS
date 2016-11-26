"use strict";

var Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  var SalaryHistory = sequelize.define('SalaryHistory', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    salary_amount: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    currency: {
      type: Sequelize.ENUM("PKR", "USD"),
      defaultValue: 'PKR',
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM("paid", "pending", "rejected"),
      allowNull: false
    },
    month: {
      type: Sequelize.INTEGER,
      defaultValue: new Date().getMonth(),
      allowNull: false,
      validate: {
        len: [0, 11]
      }
    },
    year: {
      type: Sequelize.INTEGER,
      defaultValue: new Date().getFullYear(),
      allowNull: false
    },
    salary_bump: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    bonus: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return SalaryHistory;
};
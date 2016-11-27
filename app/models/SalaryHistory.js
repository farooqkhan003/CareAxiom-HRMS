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
        len: {
          args: [0, 11],
          msg: "Months should be between 0 to 11"
        }
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
    freezeTableName: true,

    classMethods: {
      addSalary: function(userId, salary, currency, status, month, year, salaryBump, bonus) {
        return global.db.SalaryHistory.findOrCreate({
          where: {
            user_id: userId,
            month: month,
            year: year
          },
          defaults: {
            salary_amount: salary,
            currency: currency,
            status: status,
            salary_bump: salaryBump,
            bonus: bonus
          }
        });
      },
      getSalaryHistoryByUserId: function(userId) {
        return global.db.SalaryHistory.findAll({
          where: { user_id : userId }
        });
      },
      getSalaryByUserIdMonthYear: function (userId, month, year) {
        return global.db.SalaryHistory.findOne({
          where: {
            user_id: userId,
            month: month,
            year: year
          }
        });
      },
      updateSalaryStatusByUserIdMonthYear: function(userId, status, month, year) {
        return global.db.SalaryHistory.update({
          status: status
        }, {
          where: {
            user_id : userId,
            month: month,
            year: year
          }
        });
      }
    }
  });

  return SalaryHistory;
};
"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserInfo = sequelize.define('UserInfo', {
    user_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING
    },
    designation: {
      type: Sequelize.ENUM("Engineer", "Software Developer", "Senior Software Developer",
        "Quality Assurance Engineer", "Human Resource Manager"),
      // defaultValue: "Employee",
      allowNull: false
    },
    contact_no: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: true
      }
    },
    address: {
      type: Sequelize.STRING
    },
    yearly_increment: {
      type: Sequelize.FLOAT,
      defaultValue: 10,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    join_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    available_leaves: {
      type: Sequelize.FLOAT,
      defaultValue: 30,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,

    classMethods: {
      getUserInfoByUserId: function(userId) {
        return global.db.findOne({
          where: { user_id : userId }
        });
      },
      getAllUsersInfo: function (userIds) {
        return global.db.findAll({
          where: {
            user_id: { $in : userIds }
          }
        });
      },
      updateUserInfoByUserId: function(userId, firstName, lastName, phone, address) {
        return global.db.UserInfo.update({
          first_name: firstName,
          last_name: lastName,
          contact_no: phone,
          address: address
        }, {
          where: { user_id : userId }
        });
      },
      updateUserInfoByAdmin: function (userId, firstName, lastName, designation, phone, address, yearlyIncrement, availableLeaves) {
        return global.db.UserInfo.update({
          first_name: firstName,
          last_name: lastName,
          contact_no: phone,
          address: address,
          yearly_increment: yearlyIncrement,
          available_leaves: availableLeaves
        }, {
          where: { user_id : userId }
        });
      }
    }
  });

  return UserInfo;
};
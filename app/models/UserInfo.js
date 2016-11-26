"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserInfo = sequelize.define('UserInfo', {
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
      defaultValue: 0,
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
      defaultValue: 0,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true,



    classMethods: {

      getUserInfo: function() {


      },

      addUserInfo:function(){

      },

      updateUserInfo:function(){

      },

    }
  });

  return UserInfo;
};
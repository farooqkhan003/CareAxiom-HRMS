"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserSupervisor = sequelize.define('UserSupervisor', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    supervisor_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {

      getSupervisor: function() {


      },

      setSalary:function(){

      },

      updateSalary:function(){

      },

    }
  });

  return UserSupervisor;
};
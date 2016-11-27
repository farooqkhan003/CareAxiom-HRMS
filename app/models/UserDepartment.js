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
    freezeTableName: true,

    classMethods: {
      addUserToDepartment: function (userId, departmentId) {
        return global.db.UserDepartment.create({
          user_id: userId,
          department_id: departmentId
        });
      },
      updateUserDepartment: function (userId, oldDepartmentId, newDepartmentId) {
        return global.db.UserDepartment.update({
          department_id: newDepartmentId
        }, {
          where: {
            user_id: userId,
            department_id: oldDepartmentId
          }
        });
      },
      deleteUserDepartment: function (userId, departmentId) {
        return global.db.UserDepartment.destroy({
          where: {
            user_id: userId,
            department_id: departmentId
          }
        });
      }
    }
  });

  return UserDepartment;
};
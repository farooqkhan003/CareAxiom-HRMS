/*
 * @author Khawaja Ahsen
 * created on 28/11/2016
 */

"use strict";

var Sequelize = require('sequelize');

/*
 * @author Khawaja Ahsen
 * created on: 28/11/2016
 * last modified: 28/11/2016
 * description: create the Department table in db which keep track of employee department
 */
/* define the schema and functionaries of UserInfo */
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

    /* functionalities of User Modules */
    classMethods: {
      /*
       * @author Khawaja Ahsen
       * created on: 28/11/2016
       * last modified: 28/11/2016
       */
      addUserToDepartment: function (userId, departmentId) {
        return global.db.UserDepartment.create({
          user_id: userId,
          department_id: departmentId
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 28/11/2016
       * last modified: 28/11/2016
       */
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
      /*
       * @author Khawaja Ahsen
       * created on: 28/11/2016
       * last modified: 28/11/2016
       */
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
/*
 * @author Khawaja Ahsen
 * created on 29/11/2016
 */

"use strict";

var Sequelize = require('sequelize');


/*
 * @author Khawaja Ahsen
 * created on: 29/11/2016
 * last modified: 29/11/2016
 * description: create the depatment table in db which keep the employee department info.
 */
module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define('Department', {
    department_name: {
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
    },
    is_archived: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,

    classMethods: {
      /*
       * @author Khawaja Ahsen
       * created on: 29/11/2016
       * last modified: 29/11/2016
       */

      addDepartment: function(departmentName, description) {
        return global.db.Department.create({
          department_name: departmentName,
          description: description
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 29/11/2016
       * last modified: 29/11/2016
       */
      getDepartmentByName: function (departmentName) {
        return global.db.Department.findOne({
          where: {
            department_name: departmentName,
            is_archived: false
          }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 29/11/2016
       * last modified: 29/11/2016
       */
      getAllDepartments: function () {
        return global.db.Department.findAll({
          where: { is_archived : false }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 29/11/2016
       * last modified: 29/11/2016
       */
      updateDepartmentByName: function (oldDepartmentName, newDepartmentName, description) {
        return global.db.Department.update({
          department_name: newDepartmentName,
          description: description
        }, {
          where: {
            department_name: oldDepartmentName,
            is_archived: false
          }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 29/11/2016
       * last modified: 29/11/2016
       */
      deleteDepartmentByName: function (departmentName) {
        return global.db.Department.destroy({
          where: {
            department_name: departmentName,
            is_archived: false
          },
          individualHooks: true
        });
      }
    }
  });

  return Department;
};    /*   known bugs: null */

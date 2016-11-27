"use strict";

var Sequelize = require('sequelize');

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
      addDepartment: function(departmentName, description) {
        return global.db.Department.create({
          department_name: departmentName,
          description: description
        });
      },
      getDepartmentByName: function (departmentName) {
        return global.db.Department.findOne({
          where: { department_name : departmentName }
        });
      },
      getAllDepartments: function () {
        return global.db.Department.findAll({});
      },
      updateDepartmentByName: function (oldDepartmentName, newDepartmentName, description) {
        return global.db.Department.update({
          department_name: newDepartmentName,
          description: description
        }, {
          where: { department_name : oldDepartmentName }
        });
      },
      deleteDepartmentByName: function (departmentName) {
        return global.db.Department.destroy({
          where: { department_name : departmentName },
          individualHooks: true
        });
      }
    }

  });

  return Department;
};
"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Module = sequelize.define('Module', {
    module_name: {
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
      addModule: function(moduleName, description) {
        return global.db.Module.create({
          module_name: moduleName,
          description: description
        });
      },
      getModuleByName: function (moduleName) {
        return global.db.Module.findOne({
          where: {
            module_name : moduleName,
            is_archived: false
          }
        });
      },
      getAllModules: function () {
        return global.db.Module.findAll({
          where: { is_archived : false }
        });
      },
      updateModuleByName: function (oldModuleName, newModuleName, description) {
        return global.db.Module.update({
          module_name: newModuleName,
          description: description
        }, {
          where: {
            module_name: oldModuleName,
            is_archived: false
          }
        });
      },
      deleteModuleByName: function (moduleName) {
        return global.db.Module.destroy({
          where: {
            module_name: moduleName,
            is_archived: false
          },
          individualHooks: true
        });
      }
    }
  });

  return Module;
};
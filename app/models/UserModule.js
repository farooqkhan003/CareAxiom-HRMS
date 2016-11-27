"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserModule = sequelize.define('UserModule', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    module_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'Module',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true,

    classMethods: {
      addUserToModule: function(userId, moduleId) {
        return global.db.UserModule.create({
          user_id: userId,
          module_id: moduleId
        });
      },
      updateUserModule: function (userId, oldModuleId, newModuleId) {
        return global.db.UserModule.update({
          module_id: newModuleId
        }, {
          where: {
            user_id : userId,
            module_id: oldModuleId
          }
        });
      },
      deleteUserModule: function(userId, moduleId) {
        return global.db.UserModule.destroy({
          where: {
            user_id: userId,
            module_id: moduleId
          }
        });
      }
    }
  });

  return UserModule;
};
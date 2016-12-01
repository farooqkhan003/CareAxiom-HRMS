/*
 * @author Khawaja Ahsen
 * created on 29/11/2016
 */

"use strict";

var Sequelize = require('sequelize');/* import module */

/*
 * @author Khawaja Ahsen
 * created on: 29/11/2016
 * last modified: 29/11/2016
 */
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
      /*
       * @author Khawaja Ahsen
       * created on: 29/11/2016
       * last modified: 29/11/2016
       */
      addUserToModule: function(userId, moduleId) {
        return global.db.UserModule.create({
          user_id: userId,
          module_id: moduleId
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 29/11/2016
       * last modified: 29/11/2016
       */
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
      /*
       * @author Khawaja Ahsen
       * created on: 29/11/2016
       * last modified: 29/11/2016
       */
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
};   /* known bugs : null */
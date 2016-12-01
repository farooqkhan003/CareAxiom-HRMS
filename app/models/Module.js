/*
 * @author Khawaja Ahsen
 * created on 30/11/2016
 */

"use strict";

var Sequelize = require('sequelize');                 /* import module */

/*
 * @author Khawaja Ahsen
 * created on: 30/11/2016
 * last modified: 30/11/2016
 * description: create the Module table in db which keep the track of module
 */
/* define the schema and functionaries of UserSupervisor Table */
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

    /* functionalities of User Modules */
    classMethods: {

      /*
       * @author Khawaja Ahsen
       * created on: 30/11/2016
       * last modified: 30/11/2016
       */
      addModule: function(moduleName, description) {
        return global.db.Module.create({
          module_name: moduleName,
          description: description
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 30/11/2016
       * last modified: 30/11/2016
       */
      getModuleByName: function (moduleName) {
        return global.db.Module.findOne({
          where: {
            module_name : moduleName,
            is_archived: false
          }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 30/11/2016
       * last modified: 30/11/2016
       */
      getAllModules: function () {
        return global.db.Module.findAll({
          where: { is_archived : false },
          attributes: ['id', ['module_name', 'moduleName'], 'description']
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 30/11/2016
       * last modified: 30/11/2016
       */
      updateModuleByModuleId: function (moduleId, newModuleName, description) {
        return global.db.Module.update({
          module_name: newModuleName,
          description: description
        }, {
          where: {
            id: moduleId,
            is_archived: false
          }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 30/11/2016
       * last modified: 30/11/2016
       */
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
};  /* known bugs: null */
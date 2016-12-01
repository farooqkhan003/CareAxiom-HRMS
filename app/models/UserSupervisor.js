/*
 * @author Khawaja Ahsen
 * created on 30/11/2016
 */

"use strict";

var Sequelize = require('sequelize');                           /* import module */

/*
 * @author Khawaja Ahsen
 * created on: 30/11/2016
 * last modified: 30/11/2016
 * description: create the table which keep record of team lead
 */
module.exports = function(sequelize, DataTypes) {
  var UserSupervisor = sequelize.define('UserSupervisor', {     /* define the schema and functionaries of UserSupervisor Table */
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
      /*
       * @author Khawaja Ahsen
       * created on: 30/11/2016
       * last modified: 30/11/2016
       */

      addUserSupervisor: function (userId, supervisorId) {
        return global.db.UserSupervisor.create({                  /* Create a table in database */
          user_id: userId,
          supervisor_id: supervisorId
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 30/11/2016
       * last modified: 30/11/2016
       */
      updateUserSupervisor: function (userId, oldSupervisorId, newSupervisorId) {   /* update table */
        return global.db.UserSupervisor.update({
          supervisor_id: newSupervisorId
        }, {
          where: {
            user_id: userId,
            supervisor_id: oldSupervisorId
          }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 30/11/2016
       * last modified: 30/11/2016
       */
      deleteUserSupervisor: function (userId, supervisorId) {
        return global.db.UserSupervisor.destroy({
          where: {
            user_id: userId,
            supervisor_id: supervisorId
          }
        });
      }
    }
  });

  return UserSupervisor;
};  /*known bug : null */
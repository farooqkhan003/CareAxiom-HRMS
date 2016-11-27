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
      addUserSupervisor: function (userId, supervisorId) {
        return global.db.UserSupervisor.create({
          user_id: userId,
          supervisor_id: supervisorId
        });
      },
      updateUserSupervisor: function (userId, oldSupervisorId, newSupervisorId) {
        return global.db.UserSupervisor.update({
          supervisor_id: newSupervisorId
        }, {
          where: {
            user_id: userId,
            supervisor_id: oldSupervisorId
          }
        });
      },
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
};
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var LeaveHistory = sequelize.define('LeaveHistory', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    leave_type: {
      type: Sequelize.ENUM("full day", "half day", "work from home"),
      allowNull: false
    },
    reason: {
      type: Sequelize.TEXT
    },
    leave_date: {
      // type: Sequelize.DATEONLY,
      type: Sequelize.STRING,
      allowNull: false
    },
    applied_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM("applied", "approved", "rejected"),
      defaultValue: "applied",
      allowNull: false
    },
    responded_at: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: false,
    freezeTableName: true,

    hooks: {
      beforeCreate: function (leaveHistory) {
        return global.db.UserInfo.findOne({
          where: { user_id: leaveHistory.user_id }
        }).then(function (userInfo) {
          if ((userInfo.available_leaves - 1.0) < 1.0)
            throw new Error("Leaves unavailable");
          else {
            if(leaveHistory.leave_type == 'full day')
              userInfo.available_leaves -= 1.0;
            else if(leaveHistory.leave_type == 'half day')
              userInfo.available_leaves -= 0.5;

            return userInfo.updateAttributes({
              available_leaves: userInfo.available_leaves
            });
          }
        }).catch(function (err) {
          throw err;
        });
      }
    },
    classMethods: {
      applyForLeave: function(userId, leaveType, reason, leaveDate) {
        return global.db.LeaveHistory.findOrCreate({
          where: {
            user_id: userId,
            leave_date: leaveDate
          },
          defaults: {
            reason: reason,
            leave_type: leaveType
          }
        });
      },
      respondToLeave: function(userId, applyFor, status) {
        return global.db.LeaveHistory.update({
          status: status,
          responded_at: Sequelize.NOW
        }, {
          where: {
            user_id : userId,
            apply_for: applyFor
          }
        });
      },
      getLeaveHistoryByUserId: function(userId) {
        return global.db.LeaveHistory.findAll({
          where: { user_id : userId }
        });
      },
      getLeaveByUserIdApplyFor: function (userId, applyFor) {
        return global.db.LeaveHistory.findOne({
          where: {
            user_id: userId,
            apply_for: applyFor
          }
        });
      }
    }

  });

  return LeaveHistory;
};
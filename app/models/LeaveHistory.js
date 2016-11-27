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
      type: Sequelize.ENUM("full_day", "half_day", "work_from_home"),
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
      beforeCreate: function (userLeave) {
        return global.db.UserInfo.find({
          where: {
            user_id: userLeave.user_id
          }
        }).then(function (userInfo) {
          if ((userInfo.available_leaves - 1.0) < 1.0)
            throw new Error("Leaves unavailable");
          else {
            userInfo.available_leaves -= 1.0;

            return userInfo.update({
              available_leaves: userInfo.available_leaves
            });
          }
        }).catch(function (err) {
          throw err;
        });
      }
    },
    classMethods: {
      getLeavesCount: function() {

      },
      setLeave: function() {

      }
    }

  });

  return LeaveHistory;
};
/*
 * @author Khawaja Ahsen
 * created on 26/11/2016
 */

"use strict";

var Sequelize = require('sequelize');

/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * last modified: 28/11/2016
 * description: create the UserInfo table in db which keep track of user data
 */
/* define the schema and functionaries of UserInfo */
module.exports = function(sequelize, DataTypes) {
  var UserInfo = sequelize.define('UserInfo', {
    user_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING
    },
    designation: {
      type: Sequelize.ENUM("Software Developer", "Senior Software Developer", "Quality Assurance Engineer",
        "Human Resource Manager"),
      // defaultValue: "Employee",
      allowNull: false
    },
    contact_no: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    salary_amount: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    currency: {
      type: Sequelize.ENUM("PKR", "USD"),
      defaultValue: 'PKR',
      allowNull: false
    },
    salary_bump: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    bonus: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    yearly_increment: {
      type: Sequelize.FLOAT,
      defaultValue: 10,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    join_date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    available_leaves: {
      type: Sequelize.FLOAT,
      defaultValue: 30,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,

    classMethods: {
      /*
       * @author Khawaja Ahsen
       * created on: 28/11/2016
       * last modified: 28/11/2016
       */

      getUserInfoByUserId: function(userId) {
        return global.db.UserInfo.findOne({
          where: { user_id : userId }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 28/11/2016
       * last modified: 28/11/2016
       */
      getAllUsersInfoByUserIds: function (userIds) {
        // Project and LIMIT - getAllSalary, getAllLeaves, viewOrganizationalStructure, viewDirectory
        return global.db.UserInfo.findAll({
          where: {
            user_id: { $in : userIds }
          }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 28/11/2016
       * last modified: 28/11/2016
       */
      updateUserInfoByUserId: function(userId, firstName, lastName, phone, address) {
        return global.db.UserInfo.update({
          first_name: firstName,
          last_name: lastName,
          contact_no: phone,
          address: address
        }, {
          where: { user_id : userId }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 28/11/2016
       * last modified: 28/11/2016
       */
      updateUserInfoByAdmin: function (userId, firstName, lastName, designation, phone, address, salary,
                                       currency, salaryBump, bonus, yearlyIncrement, availableLeaves) {
        return global.db.UserInfo.update({
          first_name: firstName,
          last_name: lastName,
          contact_no: phone,
          address: address,
          salary_amount: salary,
          yearly_increment: yearlyIncrement,
          available_leaves: availableLeaves
        }, {
          where: { user_id : userId }
        });
      }
    },
    instanceMethods: {
      getName: function () {
        return this.getDataValue('first_name') + ' ' + this.getDataValue('last_name');
      }
    }
  });

  return UserInfo;
};
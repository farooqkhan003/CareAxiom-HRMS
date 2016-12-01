/*
 * @author Khawaja Ahsen
 * created on 26/11/2016
 */

"use strict";

var Sequelize = require('sequelize');   /* import module for models */
var bcrypt = require('bcrypt');         /* import module to secure the password */

/*
* @author Khawaja Ahsen
* created on: 26/11/2016
* last modified: 28/11/2016
* description: create the User table in db which keep track of all the employ bio data
*/
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [5, 25],
          msg: "Username should be 5 to 30 characters long"
        }
        // startsWithUpper: function (nameStr) {
        //   var first = nameStr.charAt(0);
        //   var startsWithUpper = first === first.toUpperCase();
        //   if(!startsWithUpper)
        //     throw new Error('First letter must be a uppercase letter');
        // }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
      validate: {
        len: {
          args: [5, 25],
          msg: "Password length should be between 5 to 25 characters long"
        }
        // is: ["^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$", 'i']
      }
    },
    rank: {
      type: Sequelize.ENUM("admin", "engineering owner", "engineer"),
      defaultValue: 'Engineer',
      allowNull: false
    },
    is_archived: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    timestamps: true,
    updatedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,

    hooks: {
      beforeCreate: function (user) {
        user.password = bcrypt.hashSync(user.password, 8);
      }
      // afterDestroy: function (user) {
        // console.log('NIGGGAS');
        // user.is_archived = 1;
      // }
    },
    classMethods: {
      /*
       * @author Khawaja Ahsen
       * created on: 26/11/2016
       * last modified: 28/11/2016
       */
      addUserQuick: function (userName, email, password, rank, firstName, lastName, designation, phone, salary) {
        return sequelize.transaction(function (t) {
          return global.db.User.create({
            username: userName,
            email: email,
            password: password,
            rank: rank
          }, {
            transaction : t
          }).then(function (user) {
            return global.db.UserInfo.create({
              first_name: firstName,
              last_name: lastName,
              designation: designation,
              contact_no: phone,
              salary_amount: salary,
              user_id: user.id
            }, {
              transaction: t
            });
          });
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 26/11/2016
       * last modified: 28/11/2016
       */
      addUserComplete: function (userName, email, password, rank, firstName, lastName, designation, phone, address,
                                 salary, currency, salaryBump, bonus) {
        return sequelize.transaction(function (t) {
          return global.db.User.create({
            username: userName,
            email: email,
            password: password,
            rank: rank
          }, {
            transaction : t
          }).then(function (user) {
            return global.db.UserInfo.create({
              first_name: firstName,
              last_name: lastName,
              designation: designation,
              contact_no: phone,
              address: address,
              salary_amount: salary,
              currency: currency,
              salary_bump: salaryBump,
              bonus: bonus,
              // yearly_increment: null,
              // join_date: null,
              // available_leaves: null,
              user_id: user.id
            }, {
              transaction: t
            });
          });
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 26/11/2016
       * last modified: 26/11/2016
       */
      getUserById: function (userId) {
        return global.db.User.findOne({
          where: {
            id: userId,
            is_archived: false
          }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 26/11/2016
       * last modified: 26/11/2016
       */
      getUserByUserName: function (userName) {
        return global.db.User.findOne({
          where: {
            username: userName,
            is_archived: false
          }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 26/11/2016
       * last modified: 26/11/2016
       */
      getAllUsers: function () {
        return global.db.User.findAll({
          where: { is_archived : false }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 26/11/2016
       * last modified: 26/11/2016
       */
      getAllUsersInfoForDirectory: function () {
        return sequelize.query("SELECT first_name AS firstName, last_name AS lastName, email, designation, " +
          "contact_no, address FROM User JOIN UserInfo ON UserInfo.user_id = User.id " +
          "WHERE is_archived=false",
          { type : sequelize.QueryTypes.SELECT });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 28/11/2016
       * last modified: 28/11/2016
       */
      updatePasswordByUserName: function (userName, oldPassword, newPassword) {
        return global.db.User.findOne({
          where: {
            username: userName,
            is_archived: false
          }
        }).then(function(user) {
          if(bcrypt.compareSync(oldPassword, user.password)) {
            var pswdHash = bcrypt.hashSync(newPassword, 8);
            return user.updateAttributes({
              password: pswdHash
            });
          }
          else {
            throw new Error('Old and new passwords do not match');
          }
        });
      },

      /*
       * @author Khawaja Ahsen
       * created on: 26/11/2016
       * last modified: 26/11/2016
       */
      deleteUserByUserName: function(userName) {
        // Somehow set deleted_at value in this function
        return global.db.User.update({
          is_archived: 1
        }, {
          where: { username : userName }
        });
      },
      /*
       * @author Khawaja Ahsen
       * created on: 26/11/2016
       * last modified: 26/11/2016
       */
      reviveUserByUserName: function (userName) {
        return global.db.User.update({
          is_archived: false
        }, {
          where: { username : userName }
        });
      }
    },
    /*
     * @author Khawaja Ahsen
     * created on: 26/11/2016
     * last modified: 26/11/2016
     */
    instanceMethods: {
      validPassword: function(password, userPasswordHash) {
        return bcrypt.compareSync(password, userPasswordHash);
      }
    }
  });

  return User;
};  / * known bugs: null */
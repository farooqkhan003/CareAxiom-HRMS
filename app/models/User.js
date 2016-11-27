"use strict";

var Sequelize = require('sequelize');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');

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
      },
      afterDestroy: function (user) {
        // console.log('NIGGGAS');
        // user.is_archived = 1;
      }
    },
    classMethods: {
      addUser: function (userName, email, password, firstName, lastName, designation, phone, address, salary) {
        var _user = {};
        return sequelize.transaction(function (t) {
          return global.db.User.create({
            username: userName,
            email: email,
            password: password
          }, {
            transaction : t
          }).then(function (user) {
            _user = user;
            return global.db.UserInfo.create({
              first_name: firstName,
              last_name: lastName,
              designation: designation,
              contact_no: phone,
              address: address,
              // yearly_increment: null,
              // join_date: null,
              // available_leaves: null,
              user_id: user.id
            }, {
              transaction: t
            }).then(function (userInfo) {
              return global.db.SalaryHistory.create({
                user_id: _user.dataValues.id,
                salary_amount: salary,
                // currency: null,
                status: 'pending',
                month: new Date().getMonth(),
                year: new Date().getYear()
                // salary_bump: null,
                // bonus: null
              }, {
                transaction: t
              });
            });
          });
        }).then(function (result) {
          console.log('result: \n', result);
          // Transaction has been committed
          // result is whatever the result of the promise chain returned to the transaction callback
        }).catch(function (err) {
          console.log('error: \n', err);
          // Transaction has been rolled back
          // err is whatever rejected the promise chain returned to the transaction callback
        });
      },
      getUserByUserName: function (userName) {
        return global.db.User.findOne({
          where: {
            username: userName,
            is_archived: false
          }
        });
      },
      getAllUsers: function () {
        return global.db.User.findAll({
          where: { is_archived : false }
        });
      },
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
      deleteUserByUserName: function(userName) {
        return global.db.User.destroy({
          where: {
            username: userName,
            is_archived: false
          },
          individualHooks: true
        });
      },
      reviveUserByUserName: function (userName) {
        return global.db.User.update({
          is_archived: false,
          deleted_at: null
        }, {
          where: { username : userName }
        });
      }
    },
    instanceMethods: {
      validPassword: function(password, userPasswordHash) {
        return bcrypt.compareSync(password, userPasswordHash);
      }
    }
  });

  return User;
};
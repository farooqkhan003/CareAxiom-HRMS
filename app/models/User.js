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
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    // deletedAt: 'deleted_at',
    // paranoid: true,
    freezeTableName: true,

    hooks: {
      beforeCreate: function (user, done) {
        bcrypt.hash(user.password, 8, null, function (err, pswdHash) {
          if(err) return next(err);
          user.password = pswdHash;
          return done(null, user);
        });
      }
    },
    classMethods: {
      addUserTemp: function (userName, email, password) {
        return global.db.User.create({
          username: userName,
          email: email,
          password: password
        });
      },
      addUser: function (userName, email, password, firstName, lastName, designation, phone, address, salary) {
        var _this = {};
        return sequelize.transaction(function (t) {
          return global.db.User.create({
            username: userName,
            email: email,
            password: password // Check whether hook is called or not
          }, {
            transaction : t
          }).then(function (user) {
            _this.user = user;
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
                user_id: _this.user.dataValues.id,
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
      }
    },
    instanceMethods: {
      validPassword: function(password, user) {
        return new Promise(function (resolve, reject) {
          bcrypt.hash(password, 8, null, function (err, pswdHash) {
            if(err) return reject(err);

            bcrypt.compare(password, pswdHash, function (err, isMatch) {
              if (err) return reject(err);
              if (isMatch) {
                return resolve(user);
              }
              else {
                return reject(err);
              }
            });
          });
        });
      }
    }
  });

  return User;
};
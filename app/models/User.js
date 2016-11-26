"use strict";

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [10, 30]
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
        len: [5, 20]
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
        bcrypt.hash(user.password, 8, null, function (err, hash) {
          if(err) return next(err);
          user.password = hash;
          return done(null, user);
        });
      }
    },
    classMethods: {
      addUser: function (userName, email, password, firstName, lastName, designation, phone, address, salary) {
        return sequelize.transaction(function (t) {
          return this.create({
            username: userName,
            email: email,
            password: password // Check whether hook is called or not
          }, {
            transaction : t
          }).bind(this).then(function (user) {
            this.user = user;
            return global.db.UserInfo.create({
              first_name: firstName,
              last_name: lastName,
              designation: designation,
              contact_no: phone,
              address: address,
              yearly_increment: null,
              join_date: null,
              available_leaves: null,
              user_id: user.id
            }, {
              transaction: t
            }).then(function (userInfo) {
              return global.db.SalaryHistory.create({
                user_id: this.user.id,
                salary_amount: salary,
                currency: null,
                status: 'pending',
                month: new Date().getMonth(),
                year: new Date().getYear(),
                salary_bump: null,
                bonus: null
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

      validPassword: function(password, pswdHash, done, user) {
        bcrypt.compare(password, pswdHash, function (err, isMatch) {
          if(err) console.log(err);
          if(isMatch) {
            return done(null, user);
          }
          else {
            return done(err, null);
          }
        });

        // Task.findAll().on('success', function(allTasks) {
        //   var chainer = new Sequelize.Utils.QueryChainer;
        //   allTasks.forEach(function(task) {
        //     chainer.add(task.updateAttributes({ importance: newImportance }))
        //   });
        //   chainer.run().on('success', function() {
        //     callback && callback()
        //   })
        // });
      }
    },
    instanceMethods: {
      passedDeadline: function() {
        return (this.deadline < new Date())
      }
    }
  });

  return User;
};
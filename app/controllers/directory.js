var _ = require('underscore');

/*
 * @author Khawaja Ahsen
 * created on: 30/11/2016
 * last modified: 30/11/2016
 * description: view the organizational directory .
 */

exports.viewDirectory = function (req, res, next) {
  return global.db.User.getAllUsersInfoForDirectory()
    .then(function (employees) {
      return res.render('directory', { employees : employees });
    }).catch(function (err) {
      console.log('ERRRRRRRRRRRRRRRR', err);
    });
};
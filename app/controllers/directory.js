var _ = require('underscore');

/*
 * @author Khawaja Ahsen
 * created on 29/11/2016
 */
exports.viewDirectory = function (req, res, next) {
  return global.db.User.getAllUsersInfoForDirectory()
    .then(function (employees) {
      return res.render('directory', { employees : employees });
    }).catch(function (err) {
      console.log('ERRRRRRRRRRRRRRRR', err);
    });
};
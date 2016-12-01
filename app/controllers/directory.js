var _ = require('underscore');

/*
 * @author Khawaja Ahsen
 * created on 29/11/2016
 */



exports.viewDirectory = function (req, res, next) {
  var _users;
  return global.db.User.getAllUsers()
    .then(function (users) {
      _users = users;
      var userIds = [1, 2];
      return global.db.UserInfo.getAllUsersInfoByUserIds(userIds);
    }).then(function (usersInfo) {

      var employeesObj = _.map(usersInfo, function (userInfo) {
        return {
          name: userInfo.getName(),
          designation: userInfo.get('designation'),
          email: null, // Retrieve user email from _users based on user_id
          phone: userInfo.get('contact_no'),
          address: userInfo.get('address')
        };
      });

      return res.render('directory', { employees : employeesObj });
    }).catch(function (err) {

    });

  // employee.name %></td>
  // <td><%= employee.designation %></td>
  // <td><%= employee.email %></td>
  // <td><%= employee.phone %></td>
  // <td><%= employee.address %></td>
};
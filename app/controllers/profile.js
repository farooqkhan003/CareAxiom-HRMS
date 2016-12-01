/*
 * @author Khawaja Ahsen
 * created on 26/11/2016
 */

/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * last modified: 28/11/2016
 * description: user profile controller
 */
exports.viewProfile = function (req, res, next) {
  var _user;
  return global.db.User.getUserByUserName(req.query.user)
    .then(function (user) {
      _user = user;
      if(req.user.rank == 'admin' || req.user.id == user.get('id')) {
        return global.db.UserInfo.getUserInfoByUserId(user.get('id'));
      }
      else {
        throw new Error('Unauthorized Access', 403);
      }
    }).then(function (userInfo) {
      return res.render('profile', {
        firstName: userInfo.get('first_name'),
        lastName: userInfo.get('last_name'),
        userName: _user.get('username'),
        email: _user.get('email'),
        joinDate: userInfo.get('join_date'),
        rank: _user.get('rank'),
        designation: userInfo.get('designation'),
        phone: userInfo.get('contact_no'),
        address: userInfo.get('address'),
        salary: userInfo.get('salary_amount'),
        bump: userInfo.get('salary_bump'),
        bonus: userInfo.get('bonus'),
        availableLeaves: userInfo.get('available_leaves'),

        applyLeaveMessage: req.flash('applyLeaveMessage'),
        editProfileMessage: req.flash('editProfileMessage'),

        deleteUsers: []
      });
    }).catch(function (err) {
      console.log("Error", err);
    });
};/*  known bugs: null */


/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * last modified: 28/11/2016
 * description: update profile controller
 */
exports.updateProfile = function (req, res, next) {
  var _user;
  return global.db.User.getUserByUserName(req.query.user)
    .then(function (user) {
      _user = user;
      var firstName, lastName, designation, phone, address, salary, currency, salaryBump, bonus,
        yearlyIncrement, availableLeaves;
      if(req.user.rank == 'admin') {
        firstName = req.body.firstName ? req.body.firstName : user.get('first_name');
        lastName = req.body.lastName ? req.body.lastName : user.get('last_name');
        phone = req.body.phone ? req.body.phone : user.get('phone');
        address = req.body.address ? req.body.address : user.get('address');

        return global.db.UserInfo.updateUserInfoByUserId(user.get('id'), firstName, lastName, phone, address);
      }
      else if(req.user.id == user.get('id')) {
        firstName = req.body.firstName ? req.body.firstName : user.get('first_name');
        lastName = req.body.lastName ? req.body.lastName : user.get('last_name');
        designation = req.body.designation ? req.body.designation : user.get('designation');
        phone = req.body.phone ? req.body.phone : user.get('phone');
        address = req.body.address ? req.body.address : user.get('address');
        salary = req.body.salary ? req.body.salary : user.get('salary');
        currency = req.body.currency ? req.body.currency : user.get('currency');
        salaryBump = req.body.bump ? req.body.bump : user.get('salary_bump');
        bonus = req.body.bonus ? req.body.bonus : user.get('bonus');
        yearlyIncrement = user.get('yearly_increment');
        availableLeaves = user.get('available_leaves');

        return global.db.UserInfo.updateUserInfoByAdmin(user.get('id'), firstName, lastName, designation, phone,
          address, salary, currency, salaryBump, bonus, yearlyIncrement, availableLeaves);
      }
      else {
        throw new Error('Unauthorized Access', 403);
      }
    }).then(function (affectedCount, updatedUserInfo) {
      // var userInfo = Sequelize.Utils._.first(updatedUserInfo);

      req.flash('editProfileMessage', 'Profile edited');
      var redirectURL = '/profile/view?user=' + _user.get('username');
      return res.redirect(redirectURL);
    }).catch(function (err) {
      console.log("Error", err);

      req.flash('editProfileMessage', 'Could not edit profile');
      var redirectURL = '/profile/view?user=' + _user.get('username');
      return res.redirect(redirectURL);
    });
}; /*  known bugs: null */

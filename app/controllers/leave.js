
exports.applyForLeave = function (req, res, next) {
  var leaveType = req.body.leaveType;
  var leaveDate = req.body.leaveDate;
  var reason = req.body.reason;

  console.log('Body: ', req.body);

  return global.db.LeaveHistory.applyForLeave(req.user.id, leaveType, reason, leaveDate)
    .then(function (leaveHistory) {

      req.flash('applyLeaveMessage', 'Leave Applied');
      var redirectURL = '/profile/view?user=' + req.user.userName;
      return res.redirect(redirectURL);
    }).catch(function (err) {

      req.flash('applyLeaveMessage', 'Could not apply for leave');
      var redirectURL = '/profile/view?user=' + req.user.userName;
      return res.redirect(redirectURL);
    });
};
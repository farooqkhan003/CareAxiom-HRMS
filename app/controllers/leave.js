
exports.applyForLeave = function (req, res, next) {
  var leaveType = req.body.leaveType;
  var leaveDate = req.body.leaveDate;
  var reason = req.body.reason;

  console.log('Body: ', req.body);

  return global.db.LeaveHistory.applyForLeave(req.user.id, leaveType, reason, leaveDate)
    .then(function (leaveHistory) {
      var redirectURL = '/profile/view?user=' + req.user.userName;
      return res.redirect(redirectURL);
    }).catch(function (err) {
      console.log(err);
    });
};
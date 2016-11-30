
exports.applyForLeave = function (req, res, next) {
  if(req.user.rank == 'admin') {
    var leaveType = req.body.leaveType;
    var leaveDate = req.body.leaveDate;
    var reason = req.body.reason;

    return global.db.LeaveHistory.applyForLeave(req.user.id, leaveType, reason, leaveDate)
      .then(function (leaveHistory) {
        var redirectURL = '/profile?user=' + user.get('username');
        return res.redirect(redirectURL);
      }).catch(function (err) {

      });
  }
  else {
    throw new Error('Unauthorized Access', 403);
  }
};
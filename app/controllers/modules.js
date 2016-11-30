
exports.addModule = function (req, res, next) {
  return res.render('modules');
};

exports.viewModules = function (req, res, next) {
  return global.db.Module.getAllModules()
    .then(function (modules) {
      var modulesObj = [
        {id: 1, title: 'Project 1', description: 'project 1 descrasdfasf' }
      ];

      console.log(modules);
      // module_name
      // description

      return res.render('modules', { modules : modulesObj });
    }).catch(function (err) {

    });
};

exports.updateModule = function (req, res, next) {
  return res.render('modules');
};

var _ = require('underscore');

exports.addModule = function (req, res, next) {

  if(req.user.rank != 'admin') {
    throw new Error('Unauthorized Access', 403);
  }
  var moduleName = req.body.moduleName;
  var description = req.body.description;

  global.db.Module.addModule(moduleName, description)
    .then(function (module) {
      return res.redirect('/modules/view');
    }).catch(function (err) {

  });
};

exports.viewModules = function (req, res, next) {
  return global.db.Module.getAllModules()
    .then(function (modules) {

      var modulesObj = _.map(modules, function (module) {
        return {
          id: module.get('id'),
          moduleName: module.get('module_name'),
          description: module.get('description')
        };
      });

      return res.render('modules', { modules : modulesObj });
    }).catch(function (err) {

    });
};

exports.updateModule = function (req, res, next) {
  if(req.user.rank != 'admin') {
    throw new Error('Unauthorized Access', 403);
  }
  var moduleId = req.body.moduleId;
  var moduleName = req.body.moduleName;
  var description = req.body.description;

  global.db.Module.updateModuleByModuleId(moduleId, moduleName, description)
    .then(function (module) {
      return res.redirect('/modules/view');
    }).catch(function (err) {

  });
};

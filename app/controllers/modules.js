/*
 * @author Khawaja Ahsen
 * created on 30/11/2016
 */

var _ = require('underscore');


/*
 * @author Khawaja Ahsen
 * created on: 30/11/2016

 * last modified: 30/11/2016
 */

exports.addModule = function (req, res, next) {

  console.log(req.body);

  if(req.user.rank != 'admin') {
    throw new Error('Unauthorized Access', 403);
  }
  var moduleName = req.body.moduleName;
  var description = req.body.description;

  global.db.Module.addModule(moduleName, description)
    .then(function (module) {
      return res.redirect('/company/modules/view');
    }).catch(function (err) {

  });
};  /*  known bugs: null */


/*
 * @author Khawaja Ahsen
 * created on: 30/11/2016
 * last modified: 30/11/2016
 */
exports.viewModules = function (req, res, next) {
  return global.db.Module.getAllModules()
    .then(function (modules) {

      modules = _.pluck(modules, 'dataValues');
      return res.render('modules', { modules : modules });
    }).catch(function (err) {

    });
}; /*  known bugs: null */

/*
 * @author Khawaja Ahsen
 * created on: 30/11/2016
 * last modified: 30/11/2016
 *  description: update module Controller
  */

exports.updateModule = function (req, res, next) {
  if(req.user.rank != 'admin') {
    throw new Error('Unauthorized Access', 403);
  }
  var moduleId = req.body.moduleId;
  var moduleName = req.body.moduleName;
  var description = req.body.description;

  global.db.Module.updateModuleByModuleId(moduleId, moduleName, description)
    .then(function (module) {
      return res.redirect('/company/modules/view');
    }).catch(function (err) {

  });
};  /*  known bugs: null */

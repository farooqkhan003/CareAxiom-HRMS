/*
 * @author Khawaja Ahsen
 * created on: 30/11/2016
 * last modified: 30/11/2016
 * description: all the page route related to module and organization defined here
 */
var express = require('express');
var router = express.Router();

var modules = require('../app/controllers/modules');
var organization = require('../app/controllers/organizational_structure');


router.post('/modules/new', modules.addModule);
router.get('/modules/view', modules.viewModules);
router.post('/modules/update', modules.updateModule);

router.get('/organizational_structure/view', organization.viewOrganizationalStructure);

module.exports = router;

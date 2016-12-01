/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * known bugs: null
 * last modified: 28/11/2016
 */

var express = require('express');
var router = express.Router();

var profile = require('../app/controllers/profile');

router.get('/view', profile.viewProfile);
router.post('/update', profile.updateProfile);

module.exports = router;

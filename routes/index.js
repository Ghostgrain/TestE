var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
  res.render('index',{user:req.session.loginUser});
});
router.get('/login', users.login);
module.exports = router;

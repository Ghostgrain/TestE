var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* login */
router.get('/login', users.login);

router.post('/doLogin', users.doLogin);
module.exports = router;

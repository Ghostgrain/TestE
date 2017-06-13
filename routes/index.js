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

router.get('/test', function(req, res, next){
  res.render('test');
  //res.render('test',{user:undefined});
});

router.get('/login', users.login);
router.get('/doLogin', users.doLogin);
router.get('/logout', users.logOut);
router.get('/reg', users.reg);
router.post('/doReg', users.doReg);
router.get('/check_name', users.check_name);
router.post('/file-upload', function(req, res, next) {
  console.log(req.files);
});
router.post("/upload",users.upload);

module.exports = router;


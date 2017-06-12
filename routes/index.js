var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var formidable = require('formidable');
var util = require('util');

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
router.post("/upload",function(req,res,next){
    // parse a file upload
  var form = new formidable.IncomingForm();
  //设置编辑
  form.encoding = 'utf-8';
  //设置文件存储路径
  form.uploadDir = "uploads/images/";
  //保留后缀
  form.keepExtensions = true;
  //设置单文件大小限制
  form.maxFieldsSize = 2 * 1024 * 1024;
  //form.maxFields = 1000;  设置所以文件的大小总和

  form.parse(req);


});

module.exports = router;


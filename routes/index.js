var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var querystring = require('querystring');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index', function(req, res, next) {
  res.render('index',{user:req.session.loginUser});
});

router.get('/test', function(req, res, next){
  res.header()
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
  console.log(req.body);
  //var imgData = req.body.imgData;
  //var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  //var dataBuffer = new Buffer(base64Data, 'base64');
  //fs.writeFile("out.png", dataBuffer, function(err) {
  //  if(err){
  //    res.send(err);
  //  }else{
  //    res.send("保存成功！");
  //  }
  //});




  //console.log(req.body);
  //var postData = "";
  //req.addListener("data", function (postDataChunk) {
  //  postData += postDataChunk;
  //});
  //req.addListener("end", function () {
  //  console.log('数据接收完毕');
  //  //var data1 = 'foo=bar&abc=xyz&abc=123';
  //  var params = querystring.parse(postData);
  //
  //  console.log(params);
  //  res.writeHead(500, {
  //    "Content-Type": "text/plain;charset=utf-8"
  //  });
  //});
  });
router.post("/upload",users.upload);

module.exports = router;


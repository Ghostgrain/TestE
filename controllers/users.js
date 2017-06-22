/**
 * Created by xiaochaochao on 2017/6/9.
 */
var userModule = require('../modules/users_modules');
var util = require('util');

exports.index = function(req, res, next){
    //console.log(req.session.loginUser);
    res.render('index');
};
exports.login = function(req, res, next){
    res.render('login');
};

/* do Login*/
exports.doLogin = function(req, res, next){

    var name = req.query.username;
    var pwd = req.query.pwd;
    userModule.check_access(name, pwd, function( result){
        {
            if(result.length > 0){
                var user = {id:result[0].id, name: result[0].name, img_src: result[0].img_src};
                req.session.loginUser = user;
                res.redirect('/index');
            }else{
                res.redirect('/login');
            }
        }

    });
};
/* do logout*/
exports.logOut = function(req, res, next){
    req.session.loginUser = null;
    res.render('index',{user:req.session.loginUser});
};
exports.reg = function(req, res, next){
    res.render('regPage');
}
exports.doReg = function(req, res, next){
    //console.log(req.body);
    var name = req.body.username;
    var pwd = req.body.pwd;
    userModule.check_name(name, function(data){
        if(data.length > 0) {
            res.end('<h1>error :Attempting to register an existing user!!! </h1>');
        }else{
            userModule.reg(name, pwd, function(){
                res.render('login');
            });
        }
    })
}
exports.check_name = function(req, res, next){
    userModule.check_name(req.query.name, function(data){
        if(data.length > 0) {
            res.end('rename');
        }else{
            res.end('no_re_name');
        }
    })
}
exports.upload = function(req,res,next){
    if(req.session){
        userModule.upload_file(req, res,function(result){
            //console.log(result);
            //res.writeHead(200, {'Content-type': 'text/html;charset="utf-8'});
            //res.end("<h1>恭喜你,你TM上传成功了!</h1>")
            res.redirect('/index');
        });
    }else{
        res.render('login');
    }

}

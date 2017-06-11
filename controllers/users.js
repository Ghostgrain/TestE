/**
 * Created by xiaochaochao on 2017/6/9.
 */
var userModule = require('../modules/users_modules')
exports.index = function(req, res, next){
    console.log(req.session.loginUser);
};
exports.login = function(req, res, next){
    res.render('login');
    console.log(flag);
};

/* do Login*/
exports.doLogin = function(req, res, next){
    console.log(req.body);
    //var name = req.body.username;
    //var pwd = req.body.pwd;
    //
    //userModule.check_access(name, pwd, function( result){
    //    {
    //        if(result.length > 0){
    //            var user = result[0];
    //            req.session.loginUser = user;
    //            res.redirect('/index');
    //
    //        }else{
    //            res.render('/login',{flag:true});
    //        }
    //    }
    //
    //});
};
/* do logout*/
exports.logOut = function(req, res, next){
    req.session.loginUser = null;
    res.render('index',{user:req.session.loginUser});
};
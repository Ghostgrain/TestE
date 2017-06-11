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

    var name = req.query.username;
    var pwd = req.query.pwd;
    userModule.check_access(name, pwd, function( result){
        {
            if(result.length > 0){
                var user = result[0];
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
            userModule.reg(name, pwd, function(result){
                console.log(result);
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

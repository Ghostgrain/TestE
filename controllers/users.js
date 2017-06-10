/**
 * Created by xiaochaochao on 2017/6/9.
 */
var userModule = require('../modules/users_modules')
exports.index = function(req, res, next){
    console.log(req.session.loginUser);
}
exports.login = function(req, res, next){
    res.render('login');
}
exports.doLogin = function(req, res, next){
    var name = req.body.username;
    var pwd = req.body.pwd;


    userModule.check_access(name, pwd, function(err, result){
        if(err){
            throw err;
        }else{
            if(result.length > 0){
                var user = result[0];
                req.session.loginUser = user;
                setTimeout(function(){
                    res.redirect('/index');
                },1000);
            }else{
                res.redirect('/login');
            }
            console.log(result[0]);
        }

    });
};
/**
 * Created by xiaochaochao on 2017/6/9.
 */
var query = require('./db').query;

exports.check_access = function(name, pwd, callback){
    var sql = "select * from user where name= ? and pwd =?";
    query(sql, [name,pwd], callback);
}

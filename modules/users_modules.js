/**
 * Created by xiaochaochao on 2017/6/9.
 */
var query = require('./db').query;

exports.check_access = function(name, pwd, callback){
    var sql = "select * from user where name= ? and pwd =?";
    query(sql, [name,pwd], callback);
}
exports.check_name = function(name, callback){
    var sql = "select name from user where name=?";
    query(sql, [name], callback);
}

exports.reg = function(name, pwd, callback){
    //insert into table1(field1,field2) values(value1,value2)
    var sql = "insert into user(name,pwd) values(?,?)";
    query(sql,[name,pwd], callback);
}

/**
 * Created by xiaochaochao on 2017/6/9.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'blog3'
});
exports.query=function(sql,param,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,param,function(err,rows){
            if(err){
                throw err;
            }
            callback && callback(rows);
            connection.release();
        })
    })
};

/**
 * Created by xiaochaochao on 2017/6/9.
 */
var query = require('./db').query;
var formidable = require('formidable');
var fs = require('fs');

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
exports.upload_file = function(req, callback){
    //var reqOrigin = req.header("origin");

      //if(reqOrigin !=undefined && reqOrigin.indexOf("http://localhost:3000") > -1){
      //    //设置允许 http://localhost:3000 这个域响应
      //      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      //      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      //      res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
      //    }


    // parse a file upload
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "public/images/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function(err, fields, files) {
            /*删除以前保留的头像*/
            var sql = "select img_src from user where id=?";
            var uid = req.session.loginUser.id;
            query(sql, [uid], function(data){
                if(data.length > 0 && data[0].img_src != undefined)
                {
                    var path = './public/' + data[0].img_src;
                    fs.unlink(path, function(err){
                        if(err){
                            throw err;
                        }
                        console.log("删除成功");
                    });
                }
            });

            console.log(files);
            //var path = files.upload.path.slice(7);
            //req.session.loginUser.img_src = path;
            //var sql = "update user set img_src=? where id=?";
            //query(sql,[path,uid], callback);
        }
    );

}

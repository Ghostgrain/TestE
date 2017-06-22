/**
 * Created by xiaochaochao on 2017/6/9.
 */
var query = require('./db').query;
var formidable = require('formidable');
var fs = require('fs');

exports.check_access = function (name, pwd, callback) {
    var sql = "select * from user where name= ? and pwd =?";
    query(sql, [name, pwd], callback);
}
exports.check_name = function (name, callback) {
    var sql = "select name from user where name=?";
    query(sql, [name], callback);
}

exports.reg = function (name, pwd, callback) {
    //insert into table1(field1,field2) values(value1,value2)
    var sql = "insert into user(name,pwd) values(?,?)";
    query(sql, [name, pwd], callback);
}
exports.upload_file = function (req, res, callback) {
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
    form.parse(req, function (err, fields, files) {

        //console.log(fields['avatar']);
        var base64Data = fields['avatar'].replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var uid = req.session.loginUser.id;
        fs.writeFile("public/images/" + uid + ".png", dataBuffer, function (err) {
            if (err) {
                res.send(err);
            } else {
                var sql = "update user set img_src=? where id=?";
                var imgUrl = "images/" + uid + ".png";
                query(sql, [imgUrl, uid]);
            }
        });
    });
}

//form.maxFields = 1000;  设置所以文件的大小总和





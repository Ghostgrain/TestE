/**
 * Created by xiaochaochao on 2017/6/11.
 */
var $btn = $('#btn');
$btn.on('click',function(data){
    $.get("/doLogin", $("#testform").serialize(), function(data){
        alert("Data Loaded: " + data);
    });
    //console.log(data);
})

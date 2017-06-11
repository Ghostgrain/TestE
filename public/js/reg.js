/**
 * Created by xiaochaochao on 2017/6/11.
 */
$(function(){
    var $name = $('#uname');
    var $sub = $('#sub');
    $name.on('blur',function(){
        $.get('/check_name', {name:$name.val()}, function(data){
            if(data == 'rename'){
                $('#rename').remove();
                $name.after("<span id='rename'>用户名重名</span>");
                $("#sub").attr("disabled", true);
                //$("#btn").attr("disabled", true);
            }else{
                $('#rename').remove();
                $name.after("<span id='rename'>该用户名可用</span>");
                $("#sub").attr("disabled", false);
            }
        });
    });
    //console.log(111);

});

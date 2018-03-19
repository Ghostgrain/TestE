define(function(require, exports, module){
    /*需要切割图片数据的设置,详情查看canvas属性*/
    var avatarSize = {
        sx:0,
        sy:0,
        width:160,
        height:160,
        x:0,
        y:0,
        imgWidth:160,
        imgHeight:160
    }
    /*入口参数配置,controller处理头像上传的控制器,max允许上传图像最大的放大倍数
    * width切割后的宽度,height:切割后的高度;若是改了,也需改avatarSize的imgWidth,imgHeight
    * */
    var options = {
        controller: "/upload",
        max: "2",
        width: 160,
        height: 160,
    }
    /*UploadAvatar类*/
    function UploadAvatar(target){

    }
    /*对象入口方法*/
    UploadAvatar.prototype.mkAvatar = fileChange;
    /*图片预览函数*/
    function preview(file, preMask)
    {
        var prevDiv = getById('UserAvatarEditor-container');
        if (file.files && file.files[0])
        {
            var reader = new FileReader();
            reader.onload = function(evt){
                var oImg = new Image();
                oImg.src = evt.target.result;
                oImg.style.cssText = "position:absolute;"
                oImg.onload = function(){
                    var flag = oImg.offsetWidth/oImg.offsetHeight;
                    /*flag确定图片是横放还是竖放的比例*/
                    var container = preMask.parentNode;
                    var preWidth = oImg.width;
                    var preHeight = oImg.height;
                    if(flag >= 1 ){
                        var x = oImg.height / 160;
                            oImg.height = 160;
                        if(preWidth === oImg.width)//IE没有缩放处理
                        {
                            oImg.width = oImg.width / x;
                        }
                        oImg.style.cssText += "height: 160px;";
                        oImg.dataWidth = oImg.width;
                    }
                    else{
                        var x = oImg.width / 160;
                        oImg.width = 160;
                        if(preHeight === oImg.height)//IE没有缩放处理
                        {
                            oImg.height = oImg.height / x;
                        }
                        oImg.dataHeight = oImg.height;

                        oImg.style.cssText += "width: 160px;";
                    }
                    oImg.style.cssText += "left: 50%;top: 50%;margin-left: " + -oImg.offsetWidth/2+"px;margin-top:" + -oImg.offsetHeight/2+"px;";
                    drag(container, oImg);
                };

                prevDiv.appendChild(oImg);

            };
            reader.readAsDataURL(file.files[0]);
        }
        else
        {
            prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
        }
    }
    /*文件大小检测*/
    function fileChange(target){
        /*检测上传文件的类型*/
        var btn = getById('submit_upload');
        var imgName = getById('avatar').value;
        var ext,idx;

        if (imgName == ''){
            btn.disabled=true;
            alert("请选择需要上传的文件!");
            return;
        } else {
            idx = imgName.lastIndexOf(".");
            if (idx != -1){
                ext = imgName.substr(idx+1).toUpperCase();
                ext = ext.toLowerCase( );
                // alert("ext="+ext);
                if (ext != 'jpg' && ext != 'png' && ext != 'jpeg' && ext != 'gif'){
                    btn.disabled=true;
                    alert("只能上传.jpg  .png  .jpeg  .gif类型的文件!");
                    return;
                }
            } else {
                btn.disabled=true;
                alert("只能上传.jpg  .png  .jpeg  .gif类型的文件!");
                return;
            }
        }

        /*检测上传文件的大小*/
        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        var fileSize = 0;
        if (isIE && !target.files){
            var filePath = target.value;
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            var file = fileSystem.GetFile (filePath);
            fileSize = file.Size;
        } else {
            fileSize = target.files[0].size;
        }

        var size = fileSize ;
        if(size>(1024*1024*3)){
            btn.disabled=true;
            alert("文件大小不能超过3M");
        }else{
            /*所有验证都通过了,开始弹层*/
            doMask(target);
        }
    }
    /*监听事件*/
    function addEvent(ele, event, callback)
    {
        if(ele.addEventListener)
        {ele.addEventListener(event,callback,false);
        }else if(el.attachEvent)
        {
            ele.attachEvent('on'+event,callback);
        }
    }
    /*元素拖拽函数*/
    function drag(elem, avatar)
    {
        elem.onmousedown = function(e){
            /*边界检测*/
            e = e || window.event;
            var disX = e.clientX - (avatar.offsetLeft - parseInt(avatar.style.marginLeft));
            var disY = e.clientY - (avatar.offsetTop  - parseInt(avatar.style.marginTop)) ;
            document.onmousemove = function(e){
                e = e || window.event;
                avatar.left = e.clientX - disX;
                avatar.top = e.clientY - disY;
                boundaryCheck(avatar);
                return false;
            };
            /*解决按键抬起无法释放的BUG*/
            window.onmouseup = function(){
                document.onmousemove = null;//取消事件
            }
        };
    }
    /*图片检测弹层*/2
    function doMask(target){
        var mask = document.createElement('div');
        mask.id = "mask";

        /*弹层内容模块*/
        var setAvatar = document.createElement('div');
        setAvatar.id = "setAvatar";
        var h3 = document.createElement('h3');
        h3.className = "Modal-title";
        h3.innerHTML = "编辑头像";

        /*content区*/
        var avatarContainer = document.createElement('div');
        avatarContainer.id = "UserAvatarEditor-container";

        /*关闭小按钮*/
        var closeAll = document.createElement('span');
        closeAll.style.cssText = "width:16px;height:16px;line-height:16px;" +
            ";position:absolute;right:-56px;top:0;padding:14px;background:url(../images/close.png);cursor: pointer ";
        addEvent(closeAll, "click", function(){
            document.body.removeChild(mask);
            document.body.removeChild(setAvatar);
        });

        /*保存按钮,进行切割和上传的调用*/
        var oInput = document.createElement('input');
        oInput.type = "button";
        oInput.value = "保存";
        oInput.style.cssText = "display: block;width: 220px;background: #0f88eb;border: 1px solid #0f88eb;" +
            "height: 32px;border-radius: 3px;margin: 108px auto;color: white;font-weight: bold";
        addEvent(oInput, "mouseover", function(){
            oInput.style.background = "#0d79d1";
            oInput.style.cursor = "pointer";
        });
        addEvent(oInput, "mouseout", function(){
            oInput.style.background = "#0f88eb";
        });
        /*click保存按钮*/
        addEvent(oInput, "click", function(){
            var img = getById("UserAvatarEditor-container").childNodes[1];
            avatarSize.sx = 48 - img.offsetLeft;
            avatarSize.sy = 48 - img.offsetTop;
            clipImg(img, avatarSize);
            //var close = getByTag(getById("UserAvatarEditor-container"), 'span');
            getByTag(getById('setAvatar').childNodes, 'span')[0].click();
        });

        /*聚焦框*/
        var preMask = document.createElement("div");
        preMask.style.cssText = "width: 160px;height: 160px;background: transparent;position: absolute;" +
            "left: 0;top: 0;";
        preMask.style.zIndex = 2 ;
        preMask.style.border = "48px solid rgba(255, 255, 255, .8)";

        /*放大滑块*/
        var slider = document.createElement('input');
        slider.type = "range";
        slider.step = "0.01";
        slider.min = "1";
        slider.max = options.max;
        slider.className = "RangeInput";
        slider.value = "1";

        addEvent(slider, "mousemove", function(){
            var oImg = slider.parentNode.childNodes[1].childNodes[1];
            if(oImg.style.width){
                oImg.style.width = slider.value * 160 + "px";
                oImg.height = slider.value * oImg.dataHeight;//兼容IE不能自适应

            }else{
                oImg.style.height = slider.value * 160 + "px";
                oImg.width = slider.value * oImg.dataWidth;//兼容IE不能自适应
            }
            oImg.left = parseInt(oImg.style.left);
            oImg.top = parseInt(oImg.style.top);
            /*当oImg.style.left=50%用来定位的时候会出某种奇怪的问题,用下面代码避过*/
            if(oImg.style.left.indexOf("%") === -1 && oImg.style.left.indexOf("%") === -1)
                boundaryCheck(oImg);
            oImg.style.marginTop = -oImg.offsetHeight/2 + "px";
            oImg.style.marginLeft = -oImg.offsetWidth/2 + "px";
        });

        /*进行模块的拼接*/
        document.body.appendChild(mask);
        document.body.appendChild(setAvatar);
        avatarContainer.appendChild(preMask);
        setAvatar.appendChild(h3);
        setAvatar.appendChild(avatarContainer);
        setAvatar.appendChild(closeAll);
        setAvatar.appendChild(oInput);
        setAvatar.appendChild(slider);
        preview(target,preMask);
    }
    function clipImg(img, avatarSize){
        /*Canvas切割部分*/
        var realSize = realImgSize(img);
        var scaleWidth = realSize.width / img.width;
        var scaleHeight = realSize.height / img.height;
        var newImg = new Image();
        newImg.src = img.src;
        var clipImgCanvas = document.createElement("canvas");
        clipImgCanvas.width = options.width ;
        clipImgCanvas.height = options.height ;

        var ctx = clipImgCanvas.getContext("2d");
            ctx.drawImage(newImg, avatarSize.sx * scaleWidth, avatarSize.sy * scaleHeight, avatarSize.width * scaleWidth,
                avatarSize.height * scaleHeight, avatarSize.x, avatarSize.y, avatarSize.imgWidth, avatarSize.imgHeight);
            var fullQuality = clipImgCanvas.toDataURL("image/jpeg", 1.0);
            var avatar = getByTag(getById('avatarContainer').childNodes, "img");
            avatar[0].src = fullQuality;

        /*头像上传部分*/
        upload_file(fullQuality, baseUrl()+options.controller)
        return fullQuality;
    }
    function upload_file(img, url){
        var formData = new FormData();
        formData.append('avatar', img);
        var request=null;
        if (window.XMLHttpRequest)
        {// code for IE7, Firefox, Opera, etc.
            request=new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {// code for IE6, IE5
            request=new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.open("POST", url, true);
        request.send(formData);

    }
    function realImgSize(img){
        var real_width,
            real_height,
            im          = document.createElement('img');
            im.src      = img.src,
            real_width  = im.width,
            real_height = im.height;
        return {width: real_width,height: real_height};
    }
    /*getDomById*/
    function getById(id){
        return document.getElementById(id);
    }
    /*getDomByTagName*/
    function getByTag(parent, tagName){
        var arr = [];

        tagName = tagName.toUpperCase();
        for(var index in parent){
            if(parent[index].tagName === tagName){
                arr.push(parent[index]);
            }
        }
        return arr;
    }
    /*获取当前项目的根目录(baseUrl)*/
    function baseUrl(){
        return (window.location.protocol+"//"+window.location.host);
    }
    function boundaryCheck(avatar){
        var left = 48 - parseInt(avatar.style.marginLeft);
        var top = 48 - parseInt(avatar.style.marginTop);
        var boundary = {left:left,right: left - (avatar.offsetWidth - 160),top: top, bottom: top - (avatar.offsetHeight - 160)};
        if(avatar.left > boundary.left)
        {
            avatar.left = boundary.left;
            console.log(avatar.left+"||"+boundary.left);
        }else if(avatar.left <= boundary.right){
            avatar.left = boundary.right;
        }
        if(avatar.top > boundary.top)
        {
            avatar.top = boundary.top;
        }else if(avatar.top <= boundary.bottom){
            avatar.top = boundary.bottom;
        }
        /*防止缩放后图片的预览内容缺失*/
        avatar.style.left = avatar.left + "px";
        avatar.style.top = avatar.top + "px";
    }
    module.exports=UploadAvatar;
});

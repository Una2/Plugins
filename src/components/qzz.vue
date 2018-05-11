<template>
  <div>
 <div style="width:100%;line-height: 50px;text-align: center;border-bottom: 1px solid #171E28;">
        上传图片:

        <!-- <input type="file" accept="image/*" id="uploadImage" capture="camera" onchange="selectFileImage(this);" />   -->
        <!-- <form method="post" id="file" action="" enctype="multipart/form-data"> -->
        <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" ref="uploadImg" id="uploadImage" capture="camera" @change="selectFileImage(this);"
        />
        <!-- </form>  -->
        <div class="imgbox">
            <img alt="preview" src="" id="myImage" />
            <p id="son"></p>
        </div>
    </div>
  </div>
</template>
<script>
import {EXIF} from "../../static/js/exif"
export default {
  data() {
    return {};
  },
  methods: {
      getBlobBydataURI(dataURI, type) {      
        var binary = atob(dataURI.split(',')[1]);      
        var array = [];      
        for (var i = 0; i < binary.length; i++) {        
            array.push(binary.charCodeAt(i));      
        }      
        return new Blob([new Uint8Array(array)], {
            type: type
        });    
    },
    selectFileImage(fileObj) {
        var self=this;
        // var file = fileObj.files['0'];
        var file = this.$refs.uploadImg.files['0'];
        //图片方向角 added by lzk  
        var Orientation = null;

        if (file) {
            console.log("正在上传,请稍后...");
            var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式  
            if (!rFilter.test(file.type)) {
                //showMyTips("请选择jpeg、png格式的图片", false);  
                return;
            }
            // var URL = URL || webkitURL;  
            //获取照片方向角属性，用户旋转控制  
            EXIF.getData(file, function () {
                // alert(EXIF.pretty(this));  
                EXIF.getAllTags(this);
                //alert(EXIF.getTag(this, 'Orientation'));   
                Orientation = EXIF.getTag(this, 'Orientation');
                //return;  
            });

            var oReader = new FileReader();
            oReader.onload = function (e) {
                //var blob = URL.createObjectURL(file);  
                //_compress(blob, file, basePath);  
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var expectWidth = this.naturalWidth;
                    var expectHeight = this.naturalHeight;
                    console.log(this.naturalWidth, "--------this.naturalWidth--------")

                    if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                        // expectWidth = 800;
                        expectWidth = 300;
                        expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                    } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                        // expectHeight = 1200;
                        expectHeight = 400;
                        expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                    }
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    canvas.width = expectWidth;
                    canvas.height = expectHeight;
                    ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                    var base64 = null;
                    //修复ios  
                    if (navigator.userAgent.match(/iphone/i)) {
                        console.log('iphone');
                        //alert(expectWidth + ',' + expectHeight);  
                        //如果方向角不为1，都需要进行旋转 added by lzk  
                        if (Orientation != "" && Orientation != 1) {
                            // alert('旋转处理');
                            switch (Orientation) {
                                case 6: //需要顺时针（向左）90度旋转  
                                    // alert('需要顺时针（向左）90度旋转');
                                    self.rotateImg(this, 'left', canvas);
                                    break;
                                case 8: //需要逆时针（向右）90度旋转  
                                    // alert('需要顺时针（向右）90度旋转');
                                    self.rotateImg(this, 'right', canvas);
                                    break;
                                case 3: //需要180度旋转  
                                    // alert('需要180度旋转');
                                    self.rotateImg(this, 'right', canvas); //转两次  
                                    self.rotateImg(this, 'right', canvas);
                                    break;
                            }
                        }

                        /*var mpImg = new MegaPixImage(image); 
                        mpImg.render(canvas, { 
                            maxWidth: 800, 
                            maxHeight: 1200, 
                            quality: 0.8, 
                            orientation: 8 
                        });*/
                        base64 = canvas.toDataURL("image/jpeg", 0.8);
                    } else if (navigator.userAgent.match(/Android/i)) { // 修复android  
                        var encoder = new JPEGEncoder();
                        base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                    } else {
                        //alert(Orientation);  
                        if (Orientation != "" && Orientation != 1) {
                            //alert('旋转处理');  
                            switch (Orientation) {
                                case 6: //需要顺时针（向左）90度旋转  
                                    // alert('需要顺时针（向左）90度旋转');
                                    self.rotateImg(this, 'left', canvas);
                                    break;
                                case 8: //需要逆时针（向右）90度旋转  
                                    // alert('需要顺时针（向右）90度旋转');
                                    self.rotateImg(this, 'right', canvas);
                                    break;
                                case 3: //需要180度旋转  
                                    // alert('需要180度旋转');
                                    self.rotateImg(this, 'right', canvas); //转两次  
                                    self.rotateImg(this, 'right', canvas);
                                    break;
                            }
                        }

                        base64 = canvas.toDataURL("image/jpeg", 0.8);
                    }
                    //uploadImage(base64); 
                    $("#myImage").attr("src", base64);
                    var $Blob = self.getBlobBydataURI(base64, 'image/jpeg'); //获取文件
                    var formData = new FormData();
                    formData.append("ocrfile", $Blob);
                    // var formData = new FormData();
                    // formData.append("ocrfile", $Blob);
                    $.ajax({
                        type: "POST",
                        url: "/api/app/appserver/macalline/getOCRInfo",
                        data: formData,
                        cache: false,
                        processData: false, //必须false
                        dataType: 'json',
                        contentType: false, //必须false
                        // async: false,
                        headers: {
                            "Authorization": "Bearer " + "287d855d-4f8c-4648-8ac2-c20d8575cb16",
                            "access_token": "287d855d-4f8c-4648-8ac2-c20d8575cb16",
                            "channel": 16,
                            "channel_no": 31,
                        },
                        success: function (res) {
                            console.log(res, "res-----------------请求后台的");
                            // $("#versionsize").val(res.filesize);
                            // $("#versionurl").val(res.url);
                        },
                        error: function (jqXHR) {
                            alert("上传失败")

                        }
                    })
                };
            };
            oReader.readAsDataURL(file);
            // var pic = $("#uploadImage").get(0).files[0];//获取文件
            // var pic = $("#myImage").get(0).files[0];//获取文件
            // var formData = new FormData();
            // formData.append("ocrfile", pic);
            // // var formData = new FormData();
            // // formData.append("ocrfile", pic);
            // console.log(pic, "pic--------pic")
            // console.log(formData, "formdata------formdata")
            // if (pic != null) {
            //     $.ajax({
            //         type: "POST",
            //         url: "/apis/app/appserver/macalline/getOCRInfo",
            //         data: formData,
            //         cache : false,
            //         processData: false, //必须false
            //         dataType: 'json',
            //         contentType: false, //必须false
            //         // async: false,
            //         headers: {
            //             "Authorization": "Bearer " + "1526dd0f-7499-46cf-a26d-7f50a040eafc",
            //             "access_token": "1526dd0f-7499-46cf-a26d-7f50a040eafc",
            //             "channel": 16,
            //             "channel_no": 31,
            //         },
            //         success: function (res) {
            //             console.log(res, "res-----------------请求后台的");
            //             // $("#versionsize").val(res.filesize);
            //             // $("#versionurl").val(res.url);
            //         },
            //         error: function (jqXHR) {
            //             alert("上传失败")

            //         }
            //     })
            // }

        }
    },
    /**   *  侦查附件上传情况  ,这个方法大概0.05-0.1秒执行一次   */    
    onprogress(evt) {
        var loaded = evt.loaded; //已经上传大小情况
        var tot = evt.total; //附件总大小
        var per = Math.floor(100 * loaded / tot); //已经上传的百分比
        $("#son").html(per + "%");
        $("#son").css("width", per + "%");
    },
     //对图片旋转处理 added by lzk  
    rotateImg(img, direction, canvas) {
        //alert(img);  
        //最小与最大旋转方向，图片旋转4次后回到原方向    
        var min_step = 0;
        var max_step = 3;
        //var img = document.getElementById(pid);    
        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
        var height = img.height;
        var width = img.width;
        //var step = img.getAttribute('step');    
        var step = 2;
        if (step == null) {
            step = min_step;
        }
        if (direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值    
            step > max_step && (step = min_step);
        } else {
            step--;
            step < min_step && (step = max_step);
        }
        //img.setAttribute('step', step);    
        /*var canvas = document.getElementById('pic_' + pid);   
        if (canvas == null) {   
            img.style.display = 'none';   
            canvas = document.createElement('canvas');   
            canvas.setAttribute('id', 'pic_' + pid);   
            img.parentNode.appendChild(canvas);   
        }  */
        //旋转角度以弧度值为参数    
        var degree = step * 90 * Math.PI / 180;
        var ctx = canvas.getContext('2d');
        switch (step) {
            case 0:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                break;
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height);
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0);
                break;
        }
    }
  }
};
</script>
<style>
.imgbox {
  margin-top: 10px;
  width: 300px;
  height: 400px;
}
.imgbox img {
  width: 100%;
}
</style>

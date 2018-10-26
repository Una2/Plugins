<template>
  <div>
 <div style="width:100%;line-height: 50px;text-align: center;border-bottom: 1px solid #171E28;">
       
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
import {EXIF} from '../../../static/js/exif'
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
        //ͼƬ����� added by lzk  
        var Orientation = null;

        if (file) {
            console.log("�����ϴ�,���Ժ�...");
            var rFilter = /^(image\/jpeg|image\/png)$/i; // ���ͼƬ��ʽ  
            if (!rFilter.test(file.type)) {
                //showMyTips("��ѡ��jpeg��png��ʽ��ͼƬ", false);  
                return;
            }
            // var URL = URL || webkitURL;  
            //��ȡ��Ƭ��������ԣ��û���ת����  
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
                    //�޸�ios  
                    if (navigator.userAgent.match(/iphone/i)) {
                        console.log('iphone');
                        //alert(expectWidth + ',' + expectHeight);  
                        //�������ǲ�Ϊ1������Ҫ������ת added by lzk  
                        if (Orientation != "" && Orientation != 1) {
                            // alert('��ת����');
                            switch (Orientation) {
                                case 6: //��Ҫ˳ʱ�루����90����ת  
                                    // alert('��Ҫ˳ʱ�루����90����ת');
                                    self.rotateImg(this, 'left', canvas);
                                    break;
                                case 8: //��Ҫ��ʱ�루���ң�90����ת  
                                    // alert('��Ҫ˳ʱ�루���ң�90����ת');
                                    self.rotateImg(this, 'right', canvas);
                                    break;
                                case 3: //��Ҫ180����ת  
                                    // alert('��Ҫ180����ת');
                                    self.rotateImg(this, 'right', canvas); //ת����  
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
                        base64 = canvas.toDataURL("image/jpeg", 0.2);
                    } else if (navigator.userAgent.match(/Android/i)) { // �޸�android  
                        var encoder = new JPEGEncoder();
                        base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                    } else {
                        //alert(Orientation);  
                        if (Orientation != "" && Orientation != 1) {
                            //alert('��ת����');  
                            switch (Orientation) {
                                case 6: //��Ҫ˳ʱ�루����90����ת  
                                    // alert('��Ҫ˳ʱ�루����90����ת');
                                    self.rotateImg(this, 'left', canvas);
                                    break;
                                case 8: //��Ҫ��ʱ�루���ң�90����ת  
                                    // alert('��Ҫ˳ʱ�루���ң�90����ת');
                                    self.rotateImg(this, 'right', canvas);
                                    break;
                                case 3: //��Ҫ180����ת  
                                    // alert('��Ҫ180����ת');
                                    self.rotateImg(this, 'right', canvas); //ת����  
                                    self.rotateImg(this, 'right', canvas);
                                    break;
                            }
                        }

                        base64 = canvas.toDataURL("image/jpeg", 0.2);
                    }
                    //uploadImage(base64); 
                    $("#myImage").attr("src", base64);
                    var $Blob = self.getBlobBydataURI(base64, 'image/jpeg'); //��ȡ�ļ�
                    var formData = new FormData();
                    formData.append("ocrfile", $Blob);
                    // var formData = new FormData();
                    // formData.append("ocrfile", $Blob);
                    $.ajax({
                        type: "POST",
                        url: "/api/app/appserver/macalline/getOCRInfo",
                        data: formData,
                        cache: false,
                        processData: false, //����false
                        dataType: 'json',
                        contentType: false, //����false
                        // async: false,
                        headers: {
                            "Authorization": "Bearer " + "11111111111111111111",
                            "access_token": "11111111111111111111",
                            "channel": 16,
                            "channel_no": 31,
                        },
                        success: function (res) {
                            // $("#versionsize").val(res.filesize);
                            // $("#versionurl").val(res.url);
                        },
                        error: function (jqXHR) {
                            alert("�ϴ�ʧ��")

                        }
                    })
                };
            };
            oReader.readAsDataURL(file);
            // var pic = $("#uploadImage").get(0).files[0];//��ȡ�ļ�
            // var pic = $("#myImage").get(0).files[0];//��ȡ�ļ�
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
            //         processData: false, //����false
            //         dataType: 'json',
            //         contentType: false, //����false
            //         // async: false,
            //         headers: {
            //             "Authorization": "Bearer " + "1526dd0f-7499-46cf-a26d-7f50a040eafc",
            //             "access_token": "1526dd0f-7499-46cf-a26d-7f50a040eafc",
            //             "channel": 16,
            //             "channel_no": 31,
            //         },
            //         success: function (res) {
            //             console.log(res, "res-----------------�����̨��");
            //             // $("#versionsize").val(res.filesize);
            //             // $("#versionurl").val(res.url);
            //         },
            //         error: function (jqXHR) {
            //             alert("�ϴ�ʧ��")

            //         }
            //     })
            // }

        }
    },
    /**   *  ��鸽���ϴ����  ,����������0.05-0.1��ִ��һ��   */    
    onprogress(evt) {
        var loaded = evt.loaded; //�Ѿ��ϴ���С���
        var tot = evt.total; //�����ܴ�С
        var per = Math.floor(100 * loaded / tot); //�Ѿ��ϴ��İٷֱ�
        $("#son").html(per + "%");
        $("#son").css("width", per + "%");
    },
     //��ͼƬ��ת���� added by lzk  
    rotateImg(img, direction, canvas) {
        //alert(img);  
        //��С�������ת����ͼƬ��ת4�κ�ص�ԭ����    
        var min_step = 0;
        var max_step = 3;
        //var img = document.getElementById(pid);    
        if (img == null) return;
        //img�ĸ߶ȺͿ�Ȳ�����imgԪ�����غ��ȡ����������    
        var height = img.height;
        var width = img.width;
        //var step = img.getAttribute('step');    
        var step = 2;
        if (step == null) {
            step = min_step;
        }
        if (direction == 'right') {
            step++;
            //��ת��ԭλ�ã����������ֵ    
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
        //��ת�Ƕ��Ի���ֵΪ����    
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

<template>
  <div class="main">
    <HeaderCom :text="title" :hasBack="true" :hadBack="true" />
    <div class="all">
      <img class="face" :src="imgSrc" alt="">
      <div class="imgbox">
        <img alt="" src="" id="myImage" />
        <p id="son"></p>
      </div>
      <p class="text">保持光线充足，脸部正对镜头</p>
      <img class="phone" :src="imgSrc1" alt="" @click="taking">
      <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" ref="uploadImg" id="uploadImage" capture="camera" @change="selectFileImage(this);" />
      <!-- <phone/> -->
    </div>

    <div class="next">
      <!-- <router-link to = "./noteVerify">下一步</router-link> -->
      <a href="javascript:;" @click="consever" id="next">下一步</a>
    </div>
    <div class="schedule">
      <div class="ground"></div>
    </div>
    <p class="num">75%</p>
  </div>
</template>
<script>
import { mapState } from "vuex";
import $ from "jquery";
import HeaderCom from "@/components/Headers";
import phone from "@/components/paizhao";
import pubJS from "@/assets/js/pubJS";
import { require_get, require_post } from "@/assets/js/pubJS";
import { simpleEncrypt, simpleDecrypt } from "../assets/js/secret.js";
import crypto from "crypto";
import { EXIF } from "../../static/js/exif";
import { hex_md5 } from "../assets/md5.js";

export default {
  name: "approve", //人脸认证
  components: {
    HeaderCom,
    phone
  },
  data() {
    return {
      md: ""
    };
  },
  computed: {
    ...mapState("approve", ["title", "imgSrc", "imgSrc1"])
  },
  methods: {
    taking() {},
    consever() {
      var imgSrc = $("#myImage").attr("src");
      // console.log(imgSrc)
      const that = this;
      require_get(
        "/app/appserver/uauth/validateUserFlag",
        {
          flag: "getWithT",
          token: sessionStorage.getItem("token")
        },
        {
          userId: simpleEncrypt(localStorage.getItem("userId"))
        },
        function(res) {
          // console.log(res);
          if (res.head.retFlag == "00000") {
            if (res.body.payPasswdFlag == "0") {
              that.$router.push({
                name: "payPassword"
              });
            } else if (res.body.payPasswdFlag == "1") {
              that.$router.push({
                name: "passVerify"
              });
            }
          }
        },
        function(xhr, textstatus, thrown) {}
      );
    },
    getBlobBydataURI(dataURI, type) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: type
      });
    },
    readAsBinaryString(file, fn) {
      var reader = new FileReader();
      //将文件以二进制形式读入页面
      reader.readAsBinaryString(file);
      reader.onload = function(f) {
        //显示文件
        fn(this.result);
      };
    },
    selectFileImage(fileObj) {
      var self = this;

      // console.log(this)
      // var file = fileObj.files['0'];
      var file = this.$refs.uploadImg.files[0];
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
        EXIF.getData(file, function() {
          // alert(EXIF.pretty(this));
          EXIF.getAllTags(this);
          //alert(EXIF.getTag(this, 'Orientation'));
          Orientation = EXIF.getTag(this, "Orientation");
          //return;
        });
        var oReader = new FileReader();
        oReader.onload = function(e) {
          //var blob = URL.createObjectURL(file);
          //_compress(blob, file, basePath);
          var image = new Image();
          image.src = e.target.result;
          image.onload = function() {
            var expectWidth = this.naturalWidth;
            var expectHeight = this.naturalHeight;
            // console.log(this.naturalWidth, "--------this.naturalWidth--------")
            if (
              this.naturalWidth > this.naturalHeight &&
              this.naturalWidth > 800
            ) {
              // expectWidth = 800;
              expectWidth = 300;
              expectHeight =
                expectWidth * this.naturalHeight / this.naturalWidth;
            } else if (
              this.naturalHeight > this.naturalWidth &&
              this.naturalHeight > 1200
            ) {
              // expectHeight = 1200;
              expectHeight = 400;
              expectWidth =
                expectHeight * this.naturalWidth / this.naturalHeight;
            }
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
            var base64 = null;
            //修复ios
            if (navigator.userAgent.match(/iphone/i)) {
              console.log("iphone");
              //alert(expectWidth + ',' + expectHeight);
              //如果方向角不为1，都需要进行旋转 added by lzk
              if (Orientation != "" && Orientation != 1) {
                // alert('旋转处理');
                switch (Orientation) {
                  case 6: //需要顺时针（向左）90度旋转
                    // alert('需要顺时针（向左）90度旋转');
                    self.rotateImg(this, "left", canvas);
                    break;
                  case 8: //需要逆时针（向右）90度旋转
                    // alert('需要顺时针（向右）90度旋转');
                    self.rotateImg(this, "right", canvas);
                    break;
                  case 3: //需要180度旋转
                    // alert('需要180度旋转');
                    self.rotateImg(this, "right", canvas); //转两次
                    self.rotateImg(this, "right", canvas);
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
              base64 = canvas.toDataURL("image/jpeg", 0.4);
            } else if (navigator.userAgent.match(/Android/i)) {
              // 修复android
              var encoder = new JPEGEncoder();
              base64 = encoder.encode(
                ctx.getImageData(0, 0, expectWidth, expectHeight),
                80
              );
            } else {
              //alert(Orientation);
              if (Orientation != "" && Orientation != 1) {
                //alert('旋转处理');
                switch (Orientation) {
                  case 6: //需要顺时针（向左）90度旋转
                    // alert('需要顺时针（向左）90度旋转');
                    self.rotateImg(this, "left", canvas);
                    break;
                  case 8: //需要逆时针（向右）90度旋转
                    // alert('需要顺时针（向右）90度旋转');
                    self.rotateImg(this, "right", canvas);
                    break;
                  case 3: //需要180度旋转
                    // alert('需要180度旋转');
                    self.rotateImg(this, "right", canvas); //转两次
                    self.rotateImg(this, "right", canvas);
                    break;
                }
              }
              base64 = canvas.toDataURL("image/jpeg", 0.4);

            }
            //uploadImage(base64);
            $("#myImage").attr("src", base64);
            var $Blob = self.getBlobBydataURI(base64, "image/jpeg"); //获取文件流

            var dom = document.getElementById("uploadImage");
            console.log(dom.files, "dom.files文件信息");

            // processFiles(dom.files);
            // console.log("change", hex_md5($Blob));
              // console.log("change111", md5($Blob));
            
            // var md5 = crypto.createHash("md5");
            // md5.update($Blob);
            // var a = md5.digest('hex');
            // console.log(a,"a111111");

            var formData = new FormData();
            self.readAsBinaryString($Blob, function(res) {
              console.log("change", hex_md5(res));
              formData.append("file", $Blob);
              formData.append("name", simpleEncrypt("尹浩"));
              formData.append("idNumber", simpleEncrypt("370983199501170011"));
              formData.append("mobile", simpleEncrypt("13678894307"));
              formData.append("applSeq", "0");
              formData.append("source", "2");
              //document.getElementById('myImage')f61e0c5000146291c36358ffb60f17b0
              formData.append("MD5",hex_md5(res));
              formData.append("custNo", "C201805040117001143070");
              $.ajax({
                    type: "POST",
                    url: "/api/app/appserver/faceCheck2",
                    data: formData,
                    cache: false,
                    processData: false, //必须false
                    dataType: "json",
                    contentType: false, //必须false
                    // async: false,sessionStorage.getItem('token')
                    headers: {
                      Authorization:
                        "Bearer " + "b40908b5-5428-4932-9ae0-aae2c0839b78",
                      access_token: "b40908b5-5428-4932-9ae0-aae2c0839b78",
                      channel: 16,
                      channel_no: 31
                    },
                    success: function(res) {
                      console.log(res, "res-----------------返回数据");
                      // $(".phone").css("display", "none")
                      // if (res.body.isRetry == "Y") {
                      //   alert("人脸识别通过")
                      // } else if (res.body.isRetry == "N") {
                      //   alert("人脸识别不通过,请重试")
                      //   location.reload();
                      // }
                      // $("#uploadImage").css("display","none");
                      // $("#versionsize").val(res.filesize);
                      // $("#versionurl").val(res.url);
                    },
                    error: function(xhr, textstatus, thrown) {
                      alert("上传失败");
                    }
                  });
            });
          };
        };
        oReader.readAsDataURL(file);
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
      if (direction == "right") {
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
      var ctx = canvas.getContext("2d");
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
<style scoped lang="less">
.all {
  margin-top: 0.6rem;
  width: 100%;
  height: 16.7rem;
  background: #fff;
  text-align: center;
  margin-bottom: 0.76rem;
  position: relative;
  .face {
    margin: 0 auto;
    width: 9.9rem;
    height: 11.9rem;
    display: inline-block;
    vertical-align: middle;
    margin-top: 1.55rem;
  }
  .text {
    font-size: 0.56rem;
    color: #4a4a4a;
    text-align: center;
    margin-top: 1.36rem;
  }
  .phone {
    width: 2.32rem;
    height: 2.32rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.02rem;
    margin-left: -1.2rem;
  }
  #myImage {
    margin: 0 auto;
    width: 9rem;
    height: 11rem;
    display: inline-block;
    vertical-align: middle;
    margin-top: -12.55rem;
  }
}
.next {
  width: 100%;
  text-align: center;
  a {
    width: 90%;
    height: 2rem;
    background: #fe5958;
    color: #fff;
    font-size: 0.56rem;
    border-radius: 0.15rem;
    display: inline-block;
    text-align: center;
    margin: 0 auto;
    line-height: 2rem;
  }
}
.schedule {
  margin-top: 3.5rem;
  width: 100%;
  height: 0.4rem;
  border: 0.01rem solid #fe5958;
  .ground {
    width: 75%;
    height: 0.4rem;
    background: #fe5958;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}
.num {
  font-size: 0.3rem;
  color: #fe5958;
  margin-left: 72%;
}
</style>

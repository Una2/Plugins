<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #video,
    #canvas {
        display: block;
        margin: 1em auto;
        border: 1px solid blue;
        width: 300px;
        height: 200px;
        padding: 0;
    }
    #snap {
        display: block;
        margin: 0 auto;
        width: 80%;
        height: 2em;
    }
    .shower {
        border: 1px solid red;
    }
</style>
<template>
    <div class="container">
        <!-- <video  width="320" height="240" controls autobuffer></video> -->
        <video id="video" autoplay width='100%'></video>
        <button id="snap">点击拍照2</button>
        <canvas width=642 height=482 id="canvas"></canvas>
        <img src='' class='shower'/>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
        props: {
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            url: {
                type: String
            }
        },
        mounted() {
            var canvas = document.getElementById('canvas');
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({
                        'audio': true,
                        'video': {
                            'facingMode': "user"
                        } //调用前置摄像头，后置摄像头使用video: { facingMode: { exact: "environment" } }
                    })
                    .then(function(mediaStream) {
                        getVideoStream(mediaStream)
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
            }
            if (navigator.getUserMedia)
                navigator.getUserMedia({
                        "video": true,
                        'audio': true
                    },
                    function(stream) {
                        if (video.mozSrcObject !== undefined) video.mozSrcObject = stream;
                        else video.src = ((window.URL || window.webkitURL || window.mozURL || window.msURL) &&
                            window.URL.createObjectURL(stream)) || stream;
                        video.play();
                        $('#snap').click(function() {
                            canvas.getContext("2d").drawImage(video, 0, 0, 642, 482);
                            $('.shower').attr('src',canvas.toDataURL("image/jpeg", 0.5))
                           
                        })
                    },
                    function(error) {
                        if (error.PERMISSION_DENIED) console.log("用户拒绝了浏览器请求媒体的权限", error.code);
                        if (error.NOT_SUPPORTED_ERROR) console.log("当前浏览器不支持拍照功能", error.code);
                        if (error.MANDATORY_UNSATISFIED_ERROR) console.log("指定的媒体类型未接收到媒体流", error.code);
                        $('.shower').html("Video capture error: " + error.code + error.name);
                    }
                );
        }
    }
</script>



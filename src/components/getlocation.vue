<template>
    <div>
        11111111111111
    </div>
</template>
<script>
export default {
    data(){
        return
    },
    mounted(){
        // 第一步：获取地理位置，首先要判断是否支持地理位置的API，通过
        this.justify_location();
        // 第二步：接下来判断用户是否授权
        this.agree_obtain_location();
        // 第三步：设置调函数geoSuccess,geoError以及参数option
    },
    methods:{
        //判断浏览器是否支持地理位置接口
        justify_location(){
        if(navigator.geolocation) {
            // 支持
            console.log("支持地理位置接口");
        } else {
            // 不支持
            console.log("不支持地理位置接口");
        }
    },
    //获取用户的地理位置。使用它需要得到用户的授权
    agree_obtain_location(){
        var option = {
            enableHighAccuracy : true,
            timeout : Infinity,
            maximumAge : 0
        };

        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,option);

    },
    //同意授权
    geoSuccess(event) {
        console.log(event.coords.latitude + ', ' + event.coords.longitude);

    },
    //拒绝授权 
     geoError(event) {
        console.log("Error code " + event.code + ". " + event.message);
    }
    }
}
</script>

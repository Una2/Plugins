<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'App',
  data(){
    return{
      token:"0a2b2a57-d4b5-4567-b9d9-799e29a6ba78",
      province: [],
      city: [],
      dist: [],
      shi:{},
      qu:{},
      showFlag: true,
    }
  },
  mounted() {
    var self=this;
    if(JSON.stringify(Vue.prototype.province)=='{}'||JSON.stringify(Vue.prototype.cities)=="{}"||JSON.stringify(Vue.prototype.dists)=="{}"){   

    $.ajax({
      url: "/api/app/appserver/pub/crm/findDmAreaInfo?flag=province",
      type: "get",
      dataType: "json",
      headers: {
        Authorization: "Bearer " + self.token,
        access_token: self.token,
        "content-type": "application/json;charset=UTF-8",
        channel: "16",
        channel_no: "31"
      },
      success: function(res) {
        console.log(res, "省信息");
        if (res.head && res.head.retFlag == "00000" && res.body) {
          //  self.province=res.body;
          for (var k = 0; k < res.body.length; k++) {
            var obj={};
            obj.text=res.body[k].areaName;
            obj.value= res.body[k].areaCode;
            self.province.push(obj);
            // self.province.push({
            //   text: res.body[k].areaName,
            //   value: res.body[k].areaCode
            // });
          }
          Vue.prototype.province=self.province;
          console.log(self.province, "province");
        } else {
          alert("系统异常");
        }
      },
      error: function(error) {
        console.log(error);
      }
    })
      .then(function() {
        $.ajax({
          url: "/api/app/appserver/pub/crm/findDmAreaInfo?flag=city",
          type: "get",
          dataType: "json",
          headers: {
            Authorization: "Bearer " + self.token,
            access_token: self.token,
            "content-type": "application/json;charset=UTF-8",
            channel: "16",
            channel_no: "31"
          },
          success: function(res) {
            // console.log(res, "市信息");
            if (res.head && res.head.retFlag == "00000" && res.body) {
              for (var l = 0; l < res.body.length; l++) {
                var obj={};
                obj.text= res.body[l].areaName;
                obj.value= res.body[l].areaCode;
                obj.areaParentCode= res.body[l].areaParentCode;
                 self.city.push(obj)
              }
              // console.log(self.city, "city");
            } else {
              alert("系统异常");
            }
          },
          error: function(error) {
            console.log(error);
          }
        });
      })
      .then(function() {
        $.ajax({
          url: "/api/app/appserver/pub/crm/findDmAreaInfo?flag=area",
          type: "get",
          dataType: "json",
          headers: {
            Authorization: "Bearer " + self.token,
            access_token: self.token,
            "content-type": "application/json;charset=UTF-8",
            channel: "16",
            channel_no: "31"
          },
          success: function(res) {
            // console.log(res, "区信息");
            if (res.head && res.head.retFlag == "00000" && res.body) {
              for (var m = 0; m < res.body.length; m++) {
                var obj={};
                obj.text= res.body[m].areaName;
                obj.value= res.body[m].areaCode;
                obj.areaParentCode=res.body[m].areaParentCode;
                self.dist.push(obj);
                // self.dist.push({
                //   text: res.body[m].areaName,
                //   value: res.body[m].areaCode,
                //   areaParentCode: res.body[m].areaParentCode
                // });
              }
              //  self.dist=res.body;
              // console.log(self.dist, "dist");
            } else {
              alert("系统异常");
            }
          },
          error: function(error) {
            console.log(error);
          }
        }).then(function() {
          var sheng = [];
          var Proshi = [];
          var Proqu = [];
          var shi = {};
          var qu = {};
          var length1 = self.province.length;
          var length2 = self.city.length;
          var length3 = self.dist.length;
          //  console.log(self.province[0].value)
          for (var i = 0; i < length1; i++) {
            //省
            for (var j = 0; j < length2; j++) {
              // 市
              if (self.province[i].value == self.city[j].areaParentCode) {
                Proshi.push(self.city[j]); //取到相同市
              } 
            }
            shi[self.province[i].value] = Proshi;   Proshi=[];
            // console.log(shi,"shi")
          }

        for(var m=0;m<length2;m++){
          for(var n=0;n<length3;n++){
            if (self.city[m].value == self.dist[n].areaParentCode) {
              Proqu.push(self.dist[n]); //取到相同区
            }
          }
          qu[self.city[m].value] = Proqu; Proqu=[];
        }


          self.shi = shi;
          self.qu = qu;
          console.log(shi, "shi");
          console.log(qu, "qu");
          Vue.prototype.cities=shi;
          Vue.prototype.dists=qu;
        });
      })
      .then(function() {
        // var sheng = [];
        // var shi = [];
        // var qu = [];
        // var length1 = self.province.length;
        // var length2 = self.city.length;
        // var length3 = self.dist.length;
        // //  console.log(self.province[0].value)
        // for (var i = 0; i < length1; i++) {
        //   //省
        //   //  console.log(self.province[i].value)
        //   // sheng.push({text:self.province[i].areaName,value:self.province[i].areaCode});
        //   for (var j = 0; j < length2; j++) {
        //     // 市
        //     console.log(self.province[i].value,"1");
        //     console.log(self.city[j].areaParentCode,"2")
        //     if (self.province[i].value == self.city[j].areaParentCode) {
        //       var key=self.province[i].value;
        //       alert(key)
        //       console.log(key,"key")
        //       // shi.key
        //     }
        //   }
        // }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  margin: 0;
  padding: 0;
}
html,body{
  /* height: 100%; */
  /* text-align: center; */
}
a{
  text-decoration: none;
}
li{
  list-style: none;
}
</style>

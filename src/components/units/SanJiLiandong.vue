<template>
    <div>
     <vue-pickers :show="showFlag"
                      :selectData="pickData"
                      v-on:cancel="close"
                      v-on:confirm="coonfirm">
     </vue-pickers>
    </div>
</template>
<script>
import Vue from "vue";
import Pickers from "../common/vuepickers.vue";
import { encrypt, decrypt, simpleEncrypt } from "../../assets/js/secret";
export default {
  name: "information",
  components: {
    "vue-pickers": Pickers
  },
  data() {
    return {
     
      showFlag: true,
      token:"0a2b2a57-d4b5-4567-b9d9-799e29a6ba78",
      pickData: {
        columns: 3,
        link: true,
        pData1: Vue.prototype.province,//provs_data,
        pData2: Vue.prototype.cities,//citys_data,
        pData3: Vue.prototype.dists,//dists_data
      },
      flag: true
    };
  },
  mounted() {
  if(Vue.prototype.province=="{}"){
    Vue.prototype.province=sessionStorage.getItem("province");
  }
  },
  methods: {
    close() {
      this.showFlag = false;
    },
    coonfirm(res) {
      console.log(res.select1.text,res.select1.value,"省名称----编码")
      console.log(res.select2.text,res.select1.value,"市名称----编码")
      console.log(res.select3.text,res.select1.value,"区名称----编码")
    }
  }
};
</script>
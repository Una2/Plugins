<template>
    <div class="app">
  <a href="javascript:;" rel="external nofollow" @click="showtips">显示</a>
  <tips :tips-options="tipsOptions" ref="dialog"  @yes="yes" v-cloak >
    <h3 slot="header">提示标题</h3>
    <div slot="body">
      <p>hello world</p>
      <p> qzz</p>
    </div>
  </tips>
  <div style="margin-top:660px">6666666</div>
</div>
</template>
<script>
import tips from "./common/modal.vue"
export default {
components:{
    tips,
},
  data() {
    return {
      tipsOptions: {
        title: "弹窗",
        text:"写了一个弹窗组件",
        showbtn:true,//默认true  
        btnText:"我知道了",//默认确定
      },
    };
  },

  methods: {
    // 监听从组件内传递出来的事件
    yes(args) {
      // console.log( args );
      alert(JSON.stringify(args));
    },
    // 显示tips
    showtips() {
      console.log(this.$refs.dialog,"this.$refs.dialog")
      this.$refs.dialog.showTips();
      $(".modal_box").show();
    }
  },
  mounted(){
    //   $("modal_box").height($(window).height());
  }
  // });
};
</script>


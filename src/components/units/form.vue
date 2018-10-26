<template>
  <div>
      <form>
        <div><input type="text" name="a" value="1" id="a" /></div>
        <div><input type="text" name="b" value="2" id="b" /></div>
        <div><input type="hidden" name="c" value="3" id="c" /></div>
        <div>
        <textarea name="d" rows="8" cols="40">4</textarea>
      </div>
      <div><select name="e">
        <option value="5" selected="selected">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select></div>
      <div>
        <input type="checkbox" name="f" value="8" id="f" />
      </div>
    <div>
      <input type="submit" name="g" value="Submit" id="g" />
    </div>
  </form>
  <div>
    <input type="text">
    <button type="button" @click="countdown1($event)">获取短信验证验证码</button>
  </div>
  <button @click="getForm()">点击</button>
  </div>
</template>
<script>
// import {countdown}  from '../assets/js/util.js';
export default {
  name: "formList",
  data() {
    return {
      // msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    $("form").submit(function() {
      console.log($(this).serialize(), 111);
      return false;
    });
  },
  methods: {
    getForm() {
      console.log($("form").serialize(), "222");
      console.log($("form").serializeArray(), "333");
    },
   countdown1(event){
     console.log(event,"$event")
     console.log(event.target,"$event.target")
     $(event.target).text("222222222")
     countdown(event.target,{
       second:60,
       text:"1111"
     })
   }
  }
};
</script>
<style scoped>
</style>

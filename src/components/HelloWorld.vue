<template>
  <div class="hello">
    00000000000000
    <h1>{{ msg }}</h1>
    <router-link to="/demovuex">demovuex</router-link>
    <router-link to="/pageTitle">pageTitle</router-link>
    <router-link to="/demo2">demo2</router-link>
    <router-link to="/pzupload">pzupload</router-link>
    <router-link to="/imgtomd5">imgtomd5</router-link>
    <router-link to="/paizhao">paizhao</router-link>
    <router-link to="/getlocation">getlocation</router-link>
    <router-link to="/tips">弹窗模态框</router-link>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

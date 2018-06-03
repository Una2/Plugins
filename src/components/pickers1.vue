<template>
<div>
<treeview :model='treedata'></treeview>
</div>
</template>
 
<script>
import treeview from './TreeView.vue'
export default {
 components: {
 treeview
 },
 props: {
 
 },
 method:{
 
 },
 ready:function(){
 
 },
 data(){
 return {
 treedata:{text:'地域',
 children: [{
 text: '中国',
 children: [{
  text: '陕西省',
  children: [{
  text: '西安市',
  children: [{
  text: '碑林区'
  }, {
  text: '雁塔区'
  }, {
  text: '未央区区'
  }, {
  text: '新城区'
  }]
  }, {
  text: '安康市'
  }, {
  text: '咸阳市',
  children: [{
  text: '秦都区'
  }, {
  text: '渭城区'
  }]
  }, {
  text: '渭南市'
  }]
 }, {
  text: '四川省',
  children: [{
  text: '成都市'
  }, {
  text: '绵阳市'
  }, {
  text: '广元市'
  }]
 }, {
  text: '安徽省'
 }]
 }, {
 text: '俄罗斯'
 }]}}
 }
 }
</script>
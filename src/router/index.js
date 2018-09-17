import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import demovuex from '@/components/demovuex'
import pageTitle from '@/components/pageTitle'
import demo2 from '@/components/demo2'
import imgTomd5 from '@/components/IMgTomd5'
import pzupload from '@/components/pzUpload'
import paizhao from '@/components/paizhao'
import pickers from '@/components/pickers'
import pickers1 from '@/components/pickers1'
import pickers2 from '@/components/pickers2'
import copyTaobao from '@/components/copyTaobao'
import SanJiLiandong from '@/components/SanJiLiandong'
import getlocation from '@/components/getlocation'
import tips from '@/components/tips'
import amap from '@/components/amap'
import amap1 from '@/components/amap1'

Vue.use(Router)

export default new Router({
  // mode:'history',  
  routes: [
    {//首页
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {//getlocation
      path: '/getlocation',
      name: 'getlocation',
      component: getlocation
    },
    {//高德地图
      path: '/amap',
      name: 'amap',
      component: amap
    },{//高德地图
      path: '/amap1',
      name: 'amap1',
      component: amap1
    },
    {
      path: '/demovuex',
      name: 'demovuex',
      component: demovuex
    },
    {
      path: '/pageTitle',
      name: 'pageTitle',
      component: pageTitle
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: demo2
    },
    {//图片生成md5值
      path: '/imgTomd5',
      name: 'imgTomd5',
      component: imgTomd5
    },
    {//拍照上传
      path: '/pzupload',
      name: 'pzupload',
      component: pzupload
    },
    {
      path:"/paizhao",
      name:'paizhao',
      component:paizhao
    },
    {
      path:"/pickers",
      name:'pickers',
      component:pickers
    },
    {
      path:"/pickers1",
      name:'pickers1',
      component:pickers1
    },
    {//+淘宝
      path:"/copyTaobao",
      name:'copyTaobao',
      component:copyTaobao
    },
    {
      path:"/pickers2",
      name:'pickers2',
      component:pickers2
    },{//三级联动
      path:"/SanJiLiandong",
      name:'SanJiLiandong',
      component:SanJiLiandong
    },{//模态框
      path:"/tips",
      name:'tips',
      component:tips
    }
  ]
})

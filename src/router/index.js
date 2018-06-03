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


Vue.use(Router)

export default new Router({
  mode:'history',  
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    {
      path: '/imgTomd5',
      name: 'imgTomd5',
      component: imgTomd5
    },
    {
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
    {
      path:"/copyTaobao",
      name:'copyTaobao',
      component:copyTaobao
    },
    {
      path:"/pickers2",
      name:'pickers2',
      component:pickers2
    },{
      path:"/SanJiLiandong",
      name:'SanJiLiandong',
      component:SanJiLiandong
    }
  ]
})

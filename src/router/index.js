import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import demo from '@/components/demo'
import demo1 from '@/components/demo1'
import demo2 from '@/components/demo2'
import imgTomd5 from '@/components/IMgTomd5'
import pzupload from '@/components/pzUpload'
import paizhao from '@/components/paizhao'
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
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: demo1
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
    }
  ]
})

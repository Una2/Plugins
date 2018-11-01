import Vue from 'vue'
import Router from 'vue-router'
// 乱七八糟组件    路由
import demovuex from '@/components/units/demovuex'
import pageTitle from '@/components/units/pageTitle'
import demo2 from '@/components/units/demo2'
import imgTomd5 from '@/components/units/IMgTomd5'
import pzupload from '@/components/units/pzUpload'
import paizhao from '@/components/units/paizhao'
import pickers from '@/components/units/pickers'
import pickers1 from '@/components/units/pickers1'
import pickers2 from '@/components/units/pickers2'
import copyTaobao from '@/components/units/copyTaobao'
import SanJiLiandong from '@/components/units/SanJiLiandong'
import getlocation from '@/components/units/getlocation'
import tips from '@/components/units/tips'
import amap from '@/components/units/amap'
import amap1 from '@/components/units/amap1'
import form from '@/components/units/form'

// 项目路由
import Home from '../pages/home'
import Sport from '../pages/Sport'
import Travel from '../pages/Travel'
import Detail from '../pages/Detail'
import User from '../pages/User'
import Login from '../pages/Login'
import Regist from '../pages/Regist'
import UserInfo from '../pages/UserInfo'
import Set from '../pages/Set'
import Post from '../pages/Post'
import UserMsg from '../pages/UserMsg'
import Navbar from '../pages/Navbar'
import NotFound from '../pages/NotFound'

Vue.use(Router)

export default new Router({
  // mode:'history',  
  routes: [
    {//首页
      path:"/",
      name:"home",
      component:Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/sport',
      name: 'sport',
      component: Sport
    },
    {
      path: '/travel',
      name: 'travel',
      component: Travel
    },
    {
      path: '/sport/:id',
      name: 'sport-detail',
      component: Detail
    },
    {
      path: '/travel/:id',
      name: 'travel-detail',
      component: Detail
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/user/login',
      component: Login
    },
    {
      path: '/user/regist',
      component: Regist
    },
    {
      path: '/user/info',
      component: UserInfo
    },
    {
      path: '/user/set',
      component: Set
    },
    {
      path: '/user/post',
      component: Post
    },
    {
      path: '/user/msg',
      component: UserMsg
    },
    {
      path: '/user/navbar',
      component: Navbar
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    },
    // 乱七八糟组件路由
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
    {//标题
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
    {//拍照
      path:"/paizhao",
      name:'paizhao',
      component:paizhao
    },
    {//三级联动
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
    },{//form表单
      path:"/form",
      name:'form',
      component:form
    }
  ]
})

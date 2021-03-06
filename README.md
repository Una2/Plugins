# Plugins
工作中遇到的一些问题及解决办法以及一些插件的使用

# 1 prerender-spa-plugin的使用 
# https://segmentfault.com/a/1190000012605930
<!-- 
var PrerenderSpaPlugin = require('prerender-spa-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    //这段代码意思是拷贝static文件至根目录使得渲染的文件可以找到js、css
    new CopyWebpackPlugin([{
      from: 'static'
    }]),
    
    
    new PrerenderSpaPlugin(
    //将渲染的文件放到dist目录下
      path.join(__dirname, '../dist'),   
      //需要预渲染的路由信息
      [ '/','/introduct','/culture','/Chairman','/president','/fund','/news','/honor' ],
      {
      //在一定时间后再捕获页面信息，使得页面数据信息加载完成
        captureAfterTime: 50000,
        //忽略打包错误
        ignoreJSErrors: true,
        phantomOptions: '--web-security=false',
        maxAttempts: 10,
      }
    ), 
    -->
  #pickers npm install mint-ui -S
  import Mint from 'mint-ui';
  Vue.use(Mint);


<!-- vue-amap  基于 Vue 2.x 和高德地图的地图组件 -->














  ## 永恒君的小博客
关于日常学习实践的积累、经验和填坑记录

> ### 坑眼与案例

* [input file 与拍照问题](https://github.com/foreverZ133/blogs/issues/2)
* [字体文件的引用与压缩](https://github.com/foreverZ133/blogs/issues/3)
* [微信推文中使用 SVG](https://github.com/foreverZ133/blogs/issues/28)
* [有关时间的一些骚操作](https://github.com/foreverZ133/blogs/issues/11)
* [微信小程序 drawImage 问题](https://github.com/foreverZ133/blogs/issues/1)
* [小程序 web-view 嵌入网页功能](https://github.com/foreverZ133/blogs/issues/20)
* [小程序中的一些技巧和方法](https://github.com/foreverZ133/blogs/issues/25)
* [【开始整理】全景效果的实现](https://github.com/foreverZ133/blogs/issues/17)
* [【未动笔】提示组件的插件化](#)
* [【未动笔】自写滚动模拟](#)
* [【未动笔】写游戏前可能要学会的思路](#)
* [【未动笔】当你写过 100 个加载动画后](#)
* [【未动笔】手机横屏怎么办](#)
* [【未动笔】为压图与并图走过的路](#)
* [【未动笔】视频音频播放有古怪](#)

> ### 学习与专题

* [前端路由或单页面应用基础](https://github.com/foreverZ133/blogs/issues/22)
* [前端制作遮罩与蒙版](https://github.com/foreverZ133/blogs/issues/21)
* [Tween.js 的使用](https://github.com/foreverZ133/blogs/issues/16)
* [函数的科里化与反科里化](https://github.com/foreverZ133/blogs/issues/26)
* [CSS 中的层叠上下文](https://github.com/foreverZ133/blogs/issues/15)
* [常见的几种设计模式](https://github.com/foreverZ133/blogs/issues/27)
* [响应式页面几大流派](https://github.com/foreverZ133/blogs/issues/29)
* [闲谈 css float 的二三事](https://github.com/foreverZ133/blogs/issues/4)
* [transition 需要注意的问题](https://github.com/foreverZ133/blogs/issues/18)
* [【完成过半】vue 基础知识](https://github.com/foreverZ133/blogs/issues/12)
* [【开始整理】I love 正则](https://github.com/foreverZ133/blogs/issues/14)
* [【开始整理】JS 数据类型方面的蹊跷](https://github.com/foreverZ133/blogs/issues/13)
* [【重写中】JS 的作用域与作用域链](https://github.com/foreverZ133/blogs/issues/23)
* [【开始整理】异步编程开发的流派](https://github.com/foreverZ133/blogs/issues/19)

> ### 工具与其他

* [寻找免费 VPN - Seed](http://52.187.146.95/)（Green 的后代，业界良心，但又被禁了）
* [cubic-bezier 编辑器](http://yisibl.github.io/cubic-bezier/)（用以 CSS3 动画中调节速率，非常爽）
* [大神们的对话圈子 FM](http://teahour.fm/)（看过一期尤雨溪的访谈后欲罢不能，但好像不更新了）
* [CodeWars](http://www.codewars.com/)（练习 javascript，加载有点慢，但可以见到各式各样的需求）
* [图片压缩工具 Antelope](https://pan.baidu.com/s/1o8KD2Lc)（压缩率堪比 TinyPNG，且不限量，还能压缩 GIF）
* [前端技术书籍](https://pan.baidu.com/s/1sl2Xekl)（大概90多本，有些较旧，酌情下载）
* [前端技术笔记本](https://devhints.io/)（比如搜 react，里面包含了所有 api 和知识点，进行了分组，非常棒的笔记本）
* [picsvg](http://picsvg.com/)（可将图片直接转为SVG），[svgomg](https://jakearchibald.github.io/svgomg/)（SVG压缩）

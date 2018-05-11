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
  #
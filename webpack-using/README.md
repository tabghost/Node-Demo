# webpack-using
webpack及其相关插件使用

### webpack
```
    npm install -g webpack
    npm install --save-dev webpack
```
![webpack](http://webpack.github.io/assets/what-is-webpack.png)

强大的模块加载器兼打包工具
- 优秀构建性能
- 加载器Loaders
- 支持AMD与CommonJS写法
- 代码分割Code Splitting

webpack配置文件webpack.config.js
- `entry(Obj)` 入口点,需要打包的文件从这里载入
- `output(Obj)` 输出,经webpack打包输出后的文件
- `plugins(arr)` 插件,例如提取代码共同部分
- `module(obj)` 统一单元模块处理

webpack基本指令
- `webpack` 编译
- `webpack -p` 编译及压缩(类似grunt/gulp中的js代码压缩)
- `webpack --watch` 开发中监听文件变动来进行编译
- `webpack -d` 编译输出maps
- `webpack --progress` 显示构建进度
- `webpack --display-error-details` 显示在编译中的详细错误
- `webpack --profile` 显示每一步的耗时


### webpack-dev-server
```
    npm install -g webpack-dev-server
    npm install --save-dev webpack-dev-server
```
webpack-dev-server是一个小型的Node.js express服务器，它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。webpack-dev-server发送关于编译状态的消息到客户端，客户端根据消息作出响应，即可以同步刷新浏览器。

webpack-dev-server基本指令
- `webpack-dev-server` 在本地8080端口创建一个服务器
- `webpack-dev-server --progress` 显示进度
- `webpack-dev-server --color` 显示命令行颜色
- `webpack-dev-server --content-base build` 将服务的根目录设置为build目录
- `webpack-dev-server --hot` 开启代码热替换
- `webpack-dev-server --port 3000` 设置端口为3000

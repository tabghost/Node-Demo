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
- <div style="background:#ddd;display:inline-block;margin-right:10px;">entry(Obj)</div> 入口点,需要打包的文件从这里载入

- <div style="background:#ddd;display:inline-block;margin-right:10px;">output(Obj)</div> 输出,经webpack打包输出后的文件

webpack基本指令
- <div style="background:#ddd;display:inline-block;margin-right:10px;">webpack</div> 编译

- <div style="background:#ddd;display:inline-block;margin-right:10px;">webpack -p</div> 编译及压缩(类似grunt/gulp中的js代码压缩)

- <div style="background:#ddd;display:inline-block;margin-right:10px;">webpack --watch</div> 开发中监听文件变动来进行编译

- <div style="background:#ddd;display:inline-block;margin-right:10px;">webpack -d</div> 编译输出maps

- <div style="background:#ddd;display:inline-block;margin-right:10px;">webpack --progress</div> 显示构建进度

- <div style="background:#ddd;display:inline-block;margin-right:10px;">webpack --display-error-details</div> 显示在编译中的详细错误

- <div style="background:#ddd;display:inline-block;margin-right:10px;">webpack --profile</div> 显示每一步的耗时


### webpack-dev-server
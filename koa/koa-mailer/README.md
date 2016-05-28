# koa-mailer 
基于koa的邮件收发系统

### how to run it?
```
    1. git clone 
    2. npm install 
    3. gulp dev
    4. node ./bin/www 
    5. open your browser and print localhost:5000
```

### 目录结构
- `app.js` [启动入口点](https://github.com/yxy19950717/Node-Demo/tree/master/koa/koa-mailer/app.js)
- `gulpfile.js` [gulp构建文件]()
- `/config` [mongodb与mongoose的配置]()
- `controller` [路由过来后的函数控制器]()
- `/model` [mongoose模式模型]()
- `/premail` [邮件预处理到数据库(可避免直接从邮件服务器获取数据,提升性能)]()
- `/public` [静态资源]()
- `/routes` [路由配置]()
- `/views` [模板页面]()

### /controller 功能逻辑
- `mailbox.js` 收件箱的get与post功能，包括session验证，邮件获取，邮件格式处理
- `mailpage.js` 发件箱的邮件发送功能，包括ajax，邮件发送格式处理
- `mailmesg.js` 某一封邮件信息
- `user.js` 登录页

### /public 静态资源
- `/less` less源文件
- `/pre_js` js文件(若文件多可用webpack打包)
- `/pre_css` gulp编译Less->css
- `/css` 合并压缩过后的css文件
- `/imgs` 图片

### /routes 路由控制器
- `routers.js` 整个邮件系统的路由控制

### /view 模板视图
- `error.ejs` 错误页
- `index.ejs` 登录页
- `read.ejs` 邮件箱页
- `readOne.ejs` 某一邮件页
- `write.ejs` 写邮件页

#### /premail (预处理，若需提升性能使用) 


# koa-mailer 
基于koa的邮件收发系统

### 目录结构
* app.js [启动入口点]()
* gulpfile.js [gulp构建文件]()
* /config [mongodb与mongoose的配置]()
* /controller [路由过来后的函数控制器]()
* /model [mongoose模式模型]()
* /premail [邮件预处理到数据库(可避免直接从邮件服务器获取数据,提升性能)]()
* /public [静态资源]()
* /routes [路由配置]()
* /views [模板页面]()
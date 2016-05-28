var app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , mongoose = require('./config/mongoose.js')
  , session = require('koa-session');
  
var db = mongoose();
app.keys = ['some secret hurr'];
// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(session(app))

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition 路由配置
require('./routes/routers')(app);

app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});

module.exports = app;

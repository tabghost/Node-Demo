var router = require('koa-router')();
var user = require('../controller/user');
var mailbox = require('../controller/mailbox');

module.exports = function(app) {
	//路由中间件
	app.use(router.routes());

	router.get('/', user.index);
	router.get('/read', mailbox.read_mail);
}
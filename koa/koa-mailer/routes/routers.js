var router = require('koa-router')();
var user = require('../controller/user');
var mailbox = require('../controller/mailbox');

module.exports = function(app) {
	//路由中间件
	app.use(router.routes());

	router.get('/', user.index);
	router.get('/write', mailbox.write_mail);
	router.get('/read', mailbox.read_mail_get);
	router.post('/read', mailbox.read_mail_post);
}
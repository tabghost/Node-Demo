var router = require('koa-router')();
var user = require('../controller/user');
var mailbox = require('../controller/mailbox');
var mailpage = require('../controller/mailpage');
var mailmesg = require('../controller/mailmesg');

module.exports = function(app) {
	//路由中间件
	app.use(router.routes());

	router.get('/', user.index);
	
	router.get('/read', mailbox.read_mail_get);
	router.get('/read/:id', mailmesg.read_this_mail);
	router.post('/read', mailbox.read_mail_post);

	router.get('/write', mailpage.write_mail);
	router.post('/send', mailpage.send_mail);
}
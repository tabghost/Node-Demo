var nodemailer = require('nodemailer');

module.exports = {
	write_mail: function *(next) {
		if(this.session.username) {
			yield this.render('write',{username: this.session.username});
		}else {
			this.redirect('/');
		}	
	},
	send_mail: function *(next) {
		var body = this.request.body;
		var session = this.session;
		var send = function() {
			var promise = new Promise(function(resolve, reject) {
				// 建立node到smtp服务器的连接
				var transporter = nodemailer.createTransport({
				    service: 'QQ',
				    auth: {
				        user: session.username,
				        pass: session.password
				    }
				});
				// smtp->远端
				var mailOptions = {
				    from: {
				    	name: body.myname,
				    	address: session.username + "@qq.com"
				    },
				    to: body.username + "@qq.com", 
				    subject: body.subject, 
				    html: body.html, 
				    /*
				    * 文件附件
				    * 先上传到node，后转发
				    */
				    // attachments: [
				    // 	{
				    // 		// 附件名
				    // 		filename: 'package.json',
				    // 		path: './package.json'
				    // 	}
				    // ]
				};
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        resolve('发送失败!');
				    }else{
						resolve('发送成功!');
				    }
				});
			});
			return promise;
		}

		var mesg = yield send();
		this.body = {
			mesg: mesg
		};
	}
}
	
var Imap = require('imap');
var MailParser = require('mailparser').MailParser;
var mail_874875702 = require('../premail/874875702.js');
var mongoose = require('mongoose');
var MailBox = mongoose.model('MailBox');
var nodemailer = require('nodemailer');

module.exports = {
	read_mail_get: function *(next) {
		//验证是否开启服务
		console.log(this.session);
		if(!this.session.username) {
			this.redirect('/');
		}else{
			var all_mail_msg = [];
			var imap = new Imap({
				user: this.session.username,
				password: this.session.password,
				host: 'imap.qq.com',
				port: 993,
				tls: true
			});

			function openInbox(cb) {
				imap.openBox('INBOX', true, cb);
			}

			// 日期格式转换
			function dateFormat(str) {
			  if(!str) {
			  	console.log('nmb')
			  	return;
			  }
			  var obj = {};
			  var timer = new Date() + "";
			  // 判断是否为今天
			  if(str.slice(0, 10) == timer.slice(0, 10)) {
			    obj.isToday = true;
			    // 今天还需确认时间
			    obj.receivedDate = str.slice(15, 21);
			  }else {
			  	obj.isToday = false;
			  	// 前些天需确认日期
			  	switch(str.slice(4, 7)){
			  		case 'Jan': obj.receivedDate = '1月'; break;
			  		case 'Feb': obj.receivedDate = '2月'; break;
			  		case 'Mar': obj.receivedDate = '3月'; break;
			  		case 'Apr': obj.receivedDate = '4月'; break;
			  		case 'May': obj.receivedDate = '5月'; break;
			  		case 'Jun': obj.receivedDate = '6月'; break;
			  		case 'Jul': obj.receivedDate = '7月'; break;
			  		case 'Aug': obj.receivedDate = '8月'; break;
			  		case 'Sep': obj.receivedDate = '9月'; break;
			  		case 'Oct': obj.receivedDate = '10月'; break;
			  		case 'Nov': obj.receivedDate = '11月'; break;
			  		case 'Dec': obj.receivedDate = '12月'; break;
			  	};
			  	// 1-9号
			  	if(str.slice(8, 9) == "0") {
			  		obj.receivedDate += str.slice(9, 10) + '号';
			  	}else{
			  		obj.receivedDate += str.slice(8, 10) + '号';
			  	}
			  }

			  return obj;
			}

			var mail_data = function() {
				var promise = new Promise(function(resolve, reject) {
					imap.once('ready', function() {
						openInbox(function(err, box) {
							if (err) throw err;
							/*
							* 设定数据信息
							* imap.search ->  
							* param_1: 'ALL'---所有的信息
							* param_2: ['SINCE', 'May 4, 2016']---2016年5月4号之后的信息
							*/
							imap.search([ 'ALL', ['SINCE', 'May 27, 2016'] ], function(err, results) {
								if (err) throw err; 
								/*
								* 获取数据
								* {bodies: ''} 获取整个消息,头+主体
								*/  
								var f = imap.fetch(results, { bodies: ''});
								f.on('message', function(msg, seqno) {
									var mailparser = new MailParser({defaultCharset:'gbk', streamAttachments: true});
									msg.on('body', function(stream, info) {
										stream.pipe(mailparser);
										mailparser.on("end",function(mail){
											
											var this_mail = {};
											this_mail.subject = mail.subject;
											this_mail.messageId = mail.messageId;
											this_mail.from_addr = mail.from[0]['address'];
											this_mail.from_name = mail.from[0]['name'];
											console.log(mail.from);
											this_mail.date = dateFormat(mail.date + "");						
											if(this_mail.date.receivedDate !== 'undefined号'){
												all_mail_msg.push(this_mail);
											}
										});
									});
								});
								f.once('error', function(err) {
									console.log('Fetch error: ' + err);
								});

								f.once('end', function() {
									console.log('Done fetching all messages!');
									imap.end();
								});
							});
						});
					});

					imap.once('error', function(err) {
						console.log(err);
					});

					imap.once('end', function() {
						console.log('Connection ended');
						resolve(all_mail_msg.reverse());
					});

					imap.connect();
				});
				return promise;
			};

			var data = yield mail_data();

			// console.log(data);
			yield this.render('read', {mail_data: data, username: this.session.username});
		}
	},

	
	read_mail_post: function *(next) {
		var body = this.request.body;
		var isOpen = function() {
			var promise = new Promise(function(resolve, reject) {
				var transporter = nodemailer.createTransport({
				    service: 'QQ',
				    auth: {
				        user: body.username,
				        pass: body.password
				    }
				});
				transporter.verify(function(error, success) {
				   if (error) {
				   		resolve(false);
				   } else {
				   		resolve(true);
				   }
				});
			});
			return promise;
		}
		
		if(yield isOpen()) {
			var that = this;
			this.session.username = body.username;
			this.session.password = body.password;
			var all_mail_msg = [];
			var imap = new Imap({
				user: this.session.username,
				password: this.session.password,
				host: 'imap.qq.com',
				port: 993,
				tls: true
			});

			function openInbox(cb) {
				imap.openBox('INBOX', true, cb);
			}

			// 日期格式转换
			function dateFormat(str) {
			  if(!str) {
			  	console.log('nmb')
			  	return;
			  }
			  var obj = {};
			  var timer = new Date() + "";
			  // 判断是否为今天
			  if(str.slice(0, 10) == timer.slice(0, 10)) {
			    obj.isToday = true;
			    // 今天还需确认时间
			    obj.receivedDate = str.slice(15, 21);
			  }else {
			  	obj.isToday = false;
			  	// 前些天需确认日期
			  	switch(str.slice(4, 7)){
			  		case 'Jan': obj.receivedDate = '1月'; break;
			  		case 'Feb': obj.receivedDate = '2月'; break;
			  		case 'Mar': obj.receivedDate = '3月'; break;
			  		case 'Apr': obj.receivedDate = '4月'; break;
			  		case 'May': obj.receivedDate = '5月'; break;
			  		case 'Jun': obj.receivedDate = '6月'; break;
			  		case 'Jul': obj.receivedDate = '7月'; break;
			  		case 'Aug': obj.receivedDate = '8月'; break;
			  		case 'Sep': obj.receivedDate = '9月'; break;
			  		case 'Oct': obj.receivedDate = '10月'; break;
			  		case 'Nov': obj.receivedDate = '11月'; break;
			  		case 'Dec': obj.receivedDate = '12月'; break;
			  	};
			  	// 1-9号
			  	if(str.slice(8, 9) == "0") {
			  		obj.receivedDate += str.slice(9, 10) + '号';
			  	}else{
			  		obj.receivedDate += str.slice(8, 10) + '号';
			  	}
			  }

			  return obj;
			}

			var mail_data = function() {
				var promise = new Promise(function(resolve, reject) {
					imap.once('ready', function() {
						openInbox(function(err, box) {
							if (err) throw err;
							/*
							* 设定数据信息
							* imap.search ->  
							* param_1: 'ALL'---所有的信息
							* param_2: ['SINCE', 'May 4, 2016']---2016年5月4号之后的信息
							*/
							imap.search([ 'ALL', ['SINCE', 'May 27, 2016'] ], function(err, results) {
								if (err) throw err; 
								/*
								* 获取数据
								* {bodies: ''} 获取整个消息,头+主体
								*/  
								var f = imap.fetch(results, { bodies: ''});
								f.on('message', function(msg, seqno) {
									var mailparser = new MailParser({defaultCharset:'gbk', streamAttachments: true});
									msg.on('body', function(stream, info) {
										stream.pipe(mailparser);
										mailparser.on("end",function(mail){
											var this_mail = {};
											this_mail.subject = mail.subject;
											this_mail.messageId = mail.messageId;
											this_mail.from_addr = mail.from[0]['address'];
											this_mail.from_name = mail.from[0]['name'];
											this_mail.date = dateFormat(mail.date + "");
											if(this_mail.date.receivedDate !== 'undefined号'){
												all_mail_msg.push(this_mail);
											}
										});
									});
								});
								f.once('error', function(err) {
									console.log('Fetch error: ' + err);
								});

								f.once('end', function() {
									console.log('Done fetching all messages!');
									imap.end();
								});
							});
						});
					});

					imap.once('error', function(err) {
						console.log(err);
					});

					imap.once('end', function() {
						console.log('Connection ended');
						resolve(all_mail_msg.reverse());
					});

					imap.connect();
				});
				return promise;
			};
			var data = yield mail_data();
			yield this.render('read', {mail_data: data, username: this.session.username});
		}else {
			this.redirect('/');
		}	
	}
}


// //mongoose的Promise写法
		// var data = yield MailBox.find().exec();
		// console.log(data)
		// yield this.render('read', {mail_data: data});
		// console.log(new Date());
		// //原生es6的Promise写法
		// var getData = function() {
		// 	var promise = new Promise(function(resolve, reject) {
		// 		MailBox.find({}, function(err, docs) {
		// 			if(err){
		// 				reject(err);
		// 			}else{
		// 				resolve(docs);
		// 			}
		// 		});
		// 	});
		// 	return promise;
		// }
		// var data = yield getData();
		// yield this.render('read', {mail_data: data});

		//node-imap结合Promise测试

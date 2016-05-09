var Imap = require('imap');
var MailParser = require('mailparser').MailParser;
var mongoose = require('mongoose');
var MailBox = mongoose.model('MailBox');

module.exports = function() {
	var imap = new Imap({
		user: '874875702@qq.com',
		password: 'owgoiuzdhcpkbebe',
		host: 'imap.qq.com',
		port: 993,
		tls: true
	});

	function openInbox(cb) {
		imap.openBox('INBOX', true, cb);
	}

	imap.once('ready', function() {
		openInbox(function(err, box) {
			if (err) throw err;
			/*
			* 设定数据信息
			* imap.search ->  
			* param_1: 'ALL'---所有的信息
			* param_2: ['SINCE', 'May 4, 2016']---2016年5月4号之后的信息
			*/
			imap.search([ 'SEEN', ['SINCE', 'May 4, 2016'] ], function(err, results) {
				if (err) throw err; 
				/*
				* 获取数据
				* {bodies: ''} 获取整个消息,头+主体
				*/  
				var f = imap.fetch(results, { bodies: '' });
				f.on('message', function(msg, seqno) {
					var mailparser = new MailParser({defaultCharset:'gbk', streamAttachments: true});
					msg.on('body', function(stream, info) {
						stream.pipe(mailparser);
						mailparser.on("end",function(mail){
							var this_mail = {};
							this_mail.subject = mail.subject;
							this_mail.messageId = mail.messageId;
							this_mail.from = mail.from;
							this_mail.receivedDate = mail.receivedDate;
							var mail_mesg = new MailBox(this_mail);
							mail_mesg.save(function(err) {
								console.log('savedb. status:',err ? 'falied' : 'success');
							});
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
	});

	imap.connect();
};
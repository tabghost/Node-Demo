var Imap = require('imap');
var MailParser = require('mailparser').MailParser;

module.exports = {
	read_this_mail: function *(next) {
		var id = this.params.id;
		if(this.session.username) {
			var that = this;
			var mailMesg = function() {
				var promise = new Promise(function(resolve, reject) {
					// 获取
					var imap = new Imap({
						user: that.session.username,
						password: that.session.password,
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
							imap.search([ 'ALL', ['SINCE', 'May 27, 2016'] ], function(err, results) {
								if (err) throw err; 
								var f = imap.fetch(results, { bodies: ''});
								f.on('message', function(msg, seqno) {
									var mailparser = new MailParser({defaultCharset:'gbk', streamAttachments: true});
									msg.on('body', function(stream, info) {
										stream.pipe(mailparser);
										mailparser.on("end",function(mail){
											if(mail.messageId == id) {
												resolve({
													html: mail.html,
													title: mail.subject
												});
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
					});

					imap.connect();
				});
				return promise;
			}
			var Data = yield mailMesg();
			yield this.render('readOne', {
				html: Data.html,
				username: this.session.username,
				title: Data.title
			});
		}else {
			this.redirect('/');
		}
	}
}

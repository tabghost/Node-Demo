var mongoose = require('mongoose');

var MailBoxSchema = new mongoose.Schema({
	subject: String,
	messageId: String,
	from_addr: String,
	from_name: String,
	date: Object,
});

mongoose.model('MailBox', MailBoxSchema);
var mongoose = require('mongoose');

var MailBoxSchema = new mongoose.Schema({
	subject: String,
	messageId: String,
	from: String,
	receivedDate: String,
});

mongoose.model('MailBox', MailBoxSchema);
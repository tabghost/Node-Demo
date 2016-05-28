KISSY.ready(function() {
	KISSY.use('node,io', function(S, Node, IO) {
		Node.one('#mail_sub').on('click', function(e) {
			e.preventDefault();
			IO.post('/send', {
				myname: Node.one('#sender').val(),
				username: Node.one('#receiver').val(),
				subject: Node.one('#subject').val(),
				html: Node.one('#html_mesg').val()
			}, function(data) {
				alert(data.mesg);
			});
		});
	})
});
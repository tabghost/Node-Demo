KISSY.ready(function() {
	// node模块依赖了event和anim模块
	KISSY.use('node,io', function(S, Node, IO) {
		Node.all('.mail_nav li').on('click', function(e) {
			Node.one('.mail_login').animate({
				opacity: 1,
				display: 'block'
			}, {
				duration: 0.5,
				easing: 'easeBoth'
			});
		});
		Node.one('.login_close').on('click', function(e) {
			Node.one('.mail_login').animate({
				opacity: 0,
			}, {
				duration: 0.5,
				easing: 'easeBoth',
				complete: function() {
					// 如何调用到上一次的Node.one
					Node.one('.mail_login').css('display', 'none');
				}
			});
		});
		Node.one('#mail_sub').on('click', function(e) {
			alert('我操你妈的库里')
			e.preventDefault();
			IO.post('/send', {
				username: Node.one('#receiver').val(),
				subject: Node.one('#subject').val(),
				html: Node.one('#html_mesg').val()
			}, function(data) {
				console.log(data.mesg)
			});
		});
	});
})
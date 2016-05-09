KISSY.ready(function() {
	// node模块依赖了event和anim模块
	KISSY.use('node', function(S, Node) {
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

	});
})
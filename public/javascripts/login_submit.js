$(document).ready( ()=> {

	$('#login_button').on('click', (event)=> {
		event.preventDefault();
		event.stopImmediatePropagation();

		$('#loading-banner').removeClass('hidden');
		$('#main-page').addClass('hidden');

		let loginForm = $('#login_form')[0];
		let loginData = new FormData(loginForm);
		$.ajax({
			url: '/login',
			type: 'POST',
			data: loginData,
			cache: false,
			contentType: false,
			processData: false,
			async: true,
		}).done( ()=> {
			$('#loading-banner').addClass('hidden');
			$('#main-page').removeClass('hidden');
		}).fail( ()=> {
			$('#loading-banner').addClass('hidden');
			$('#main-page').removeClass('hidden');
			$('#login_message').text(this.statusText);
		});
	})
});
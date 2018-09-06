$(document).ready( ()=> {

	$('#login_button').on('click', (event)=> {

		$('#loading-banner').removeClass('hidden');
		$('#main-page').addClass('hidden');

		let loginForm = $('#login_form');
		$.ajax({
			url: loginForm.attr('action'),
			type: loginForm.attr('method'),
			dataType: 'JSON',
			data: new FormData(loginForm),
			cache: false,
			contentType: false,
			processData: false,
			async: true,
			success: (response)=> {
				$('#loading-banner').addClass('hidden');
				$('#main-page').removeClass('hidden');
			},
			fail: (jqXHR, textStatus, errorThrown)=> {
				$('#loading-banner').addClass('hidden');
				$('#main-page').removeClass('hidden');
				$('#login_message').text(textStatus);
			}
		});
		event.preventDefault();
		event.stopImmediatePropagation();
	})
});
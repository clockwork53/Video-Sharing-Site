$(document).ready( ()=> {

	$('#signup_button').on('click', (event)=> {

		$('#loading-banner').removeClass('hidden');
		$('#main-page').addClass('hidden');

		let signupForm = $('#signup_form');

		$.ajax({
			url: signupForm.attr('action'),
			type: signupForm.attr('method'),
			data: new FormData(signupForm),
			dataType: 'JSON',
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
				$('#signup_message').text(textStatus);
			}
		});
		event.preventDefault();
		event.stopImmediatePropagation();
	})
});
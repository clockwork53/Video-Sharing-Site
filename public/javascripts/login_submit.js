$(document).ready( ()=> {

	$('#login_button').on('click', (event)=> {
		event.preventDefault();
		event.stopImmediatePropagation();
		let loginForm = $('#login_form');
		if(loginForm.parsley().validate()) {

			$('#loading-banner').removeClass('hidden');
			$('#main-page').addClass('hidden');

			let signupData = {
				username: $('#username_login').val(),
				password: $('#password_login').val(),
			};

			$.ajax({
				url: loginForm.attr('action'),
				type: loginForm.attr('method'),
				dataType: 'JSON',
				data: JSON.stringify(signupData),
				contentType: "application/json",
				cache: false,
				processData: false,
				async: true,
			}).done((response) => {
				$('#loading-banner').addClass('hidden');
				$('#main-page').removeClass('hidden');
				if (response.error === false) {
					window.location = '/';
				}else {
					$('#message_modal').modal('show');
					$('#message_title').text('Error');
					$('#message_body').html('<p>' + response.error + '</p>');
				}
			}).fail((response) => {
				$('#loading-banner').addClass('hidden');
				$('#main-page').removeClass('hidden');
				alert('oops something went wrong! try again some other time');
			});
		}
	})
});
$(document).ready( ()=> {

	$('#signup_button').on('click', (event)=> {
		event.preventDefault();
		event.stopImmediatePropagation();
		$('#loading-banner').removeClass('hidden');
		$('#main-page').addClass('hidden');

		let signupForm = $('#signup_form');
		let signupData = {
			username: $('#username_signup').val(),
			password: $('#password_signup').val(),
			email: $('#email_signup').val(),
			telNum: $('#telNum_signup').val(),
			fName: $('#fName_signup').val(),
			lName: $('#lName_signup').val(),
			alma: $('#alma_signup').val(),
		};

		$.ajax({
			url: signupForm.attr('action'),
			type: signupForm.attr('method'),
			dataType: 'JSON',
			data: JSON.stringify(signupData),
			contentType: "application/json",
			cache: false,
			processData: false,
			async: true,
		}).done(() => {
			$('#loading-banner').addClass('hidden');
			$('#main-page').removeClass('hidden');
			$('#signup_modal').modal('hide');
		}).fail(() => {
			$('#loading-banner').addClass('hidden');
			$('#main-page').removeClass('hidden');
		});
	})
});
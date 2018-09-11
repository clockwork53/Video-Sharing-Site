$(document).ready( ()=> {

	$('#signup_button').on('click', (event)=> {
		event.preventDefault();
		event.stopImmediatePropagation();
		let signupForm = $('#signup_form');
		if(signupForm.parsley().validate()) {

			$('#loading-banner').removeClass('hidden');
			$('#main-page').addClass('hidden');

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
			}).done((response) => {
				$('#loading-banner').addClass('hidden');
				$('#main-page').removeClass('hidden');
				if (response.error === false) {
					$('#signup_modal').modal('hide');
					$('#message_modal').modal('show');
					$('#message_title').text('Success');
					$('#message_body').html('<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#login_modal">Sign In</button>');
				} else if (response.error === 'notFatal') {
					$('#message_modal').modal('show');
					$('#message_title').text('Error');
					if (response.bodyEmpty)
						$('#message_body').html('<p> Please fill the form before submitting!');
					else {
						if (response.usernameInvalid)
							$('#message_body').append('<br/> Invalid Username!');
						if (response.emailInvalid)
							$('#message_body').append('<br/> Invalid email!');
						if (response.fNameInvalid)
							$('#message_body').append('<br/> Invalid First Name!');
						if (response.lNameInvalid)
							$('#message_body').append('<br/> Invalid Last Name!');
						if (response.telInvalid)
							$('#message_body').append('<br/> Invalid Tel Number!');
						if (response.passwordCommon)
							$('#message_body').append('<br/> Your Password is very weak please Choose a better password');
					}
				} else {
					alert(response.error.sqlMessage);
				}
			}).fail((response) => {
				$('#loading-banner').addClass('hidden');
				$('#main-page').removeClass('hidden');
				alert('oops something went wrong! try again some other time');
			});
		}
	})
});
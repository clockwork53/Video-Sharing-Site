$(document).ready( ()=> {

	$('#signup_button').on('click', (event)=> {
		event.preventDefault();
		event.stopImmediatePropagation();

		$('#loading-banner').removeClass('hidden');
		$('#main-page').addClass('hidden');

		let signupForm = $('#signup_form')[0];
		let signupData = new FormData(signupForm);
		$.ajax({
			url: '/signup',
			type: 'POST',
			data: signupData,
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
			$('#signup_message').text(this.statusText);
		});
	})
});
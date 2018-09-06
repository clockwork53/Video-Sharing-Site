$(document).ready( ()=> {

	$('#signup_button').on('click', (event)=> {
		event.preventDefault();
		event.stopImmediatePropagation();
		let form = $('#signup_form')[0];
		let signupData = new FormData(form);
		let ajaxReq = new XMLHttpRequest();
		ajaxReq.open('POST', '/signup', true);

		ajaxReq.onloadstart = ()=> {
			$('#loading-banner').removeClass('hidden');
			$('#main-page').addClass('hidden');
		};
		ajaxReq.onloadend = ()=> {
			$('#loading-banner').addClass('hidden');
			$('#main-page').removeClass('hidden');
		};
		ajaxReq.ontimeout = ()=> {
			$('#loading-banner').addClass('hidden');
			$('#main-page').removeClass('hidden');
			$('#signup_alert').removeClass('hidden');
			$('#signup_message').text('Timeout Try again');
		};
		ajaxReq.onerror = (err)=> {
			$('#loading-banner').addClass('hidden');
			$('#main-page').removeClass('hidden');
			$('#signup_alert').removeClass('hidden');
			$('#signup_message').text(err);
		};
		ajaxReq.send(signupData);
	})
});
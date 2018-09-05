$(document).ready( ()=> {

	let progressbar = $("#upload_progressbar");
	let progressbarText = $("#upload_progressbar_text");
	$('#upload_progress').hide();
	$('#upload_alert').hide();

	let showInfo = (message)=> {
		$('#upload_progress').hide();
		$('#upload_message').text(message);
		$('#upload_alert').show();
	};

	$("#upload_button").on('click', (event)=> {
		event.preventDefault();
		event.stopImmediatePropagation();

		$('#upload_progress').show();
		let form = $('#upload_form')[0];
		let uploadData = new FormData(form);

		let ajaxReq = new XMLHttpRequest();
		ajaxReq.open('POST', '/upload', true);

		ajaxReq.upload.onprogress = (progress)=> {
			if(progress.lengthComputable){
				let percentage = (progress.loaded / progress.total) * 100;
				progressbar.attr({'style':'width: '+ percentage +'%;', 'aria-valuenow': percentage});
				progressbarText.text(Math.round(percentage) + '%');
			}
		};

		ajaxReq.onerror = (err)=> {
			showInfo(err);
			//showInfo('An error occurred while submitting the form. Maybe your file is too big');
		};

		ajaxReq.onload = ()=> {
			showInfo(this.statusText);
		};

		ajaxReq.send(uploadData);
	})
});

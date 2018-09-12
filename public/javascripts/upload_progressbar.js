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
		let uploadForm = $('#upload_form')[0];
		let uploadData = new FormData(uploadForm);

		$.ajax({
			xhr: ()=> {
				let ajaxUploadReq = new window.XMLHttpRequest();
				ajaxUploadReq.upload.addEventListener('progress', (progress)=> {
					if(progress.lengthComputable){
						let percentage = (progress.loaded / progress.total) * 100;
						progressbar.attr({'style':'width: '+ percentage +'%;', 'aria-valuenow': percentage});
						progressbarText.text(Math.round(percentage) + '%');
					}
				}, false);
				return ajaxUploadReq;
			},
			url: '/uploads/videoUpload',
			type: 'POST',
			data: uploadData,
			cache: false,
			contentType: false,
			processData: false,
			async: true,
		}).done(()=> {
			showInfo('Success');
		}).fail(()=> {
			showInfo(this.statusText);
		});
	})
});

$(document).ready(function () {

	let progressbar = $("#upload_progressbar");
	let progressbarText = $("#upload_progressbar_text");
	$('#upload_progress').hide();
	$('#upload_alert').hide();

	let showInfo = function(message){
		$('#upload_progress').hide();
		$('#upload_message').text(message);
		$('#upload_alert').show();
	};

	$("#upload_button").on('click', function(event){
		event.preventDefault();
		event.stopImmediatePropagation();

		$('#upload_progress').show();
		let form = $('#upload_form')[0];
		let uploadData = new FormData(form);
		//let file = document.getElementsByName('file').files[0];
		//uploadData.append('file', file);

		let ajaxReq = new XMLHttpRequest();
		ajaxReq.open('POST', '/upload', true);

		ajaxReq.upload.onprogress = function(progress){
			if(progress.lengthComputable){
				let percentage = (progress.loaded / progress.total) * 100;
				progressbar.attr({'style':'width: '+ percentage +'%;', 'aria-valuenow': percentage});
				progressbarText.text(Math.round(percentage) + '%');
			}
		};

		ajaxReq.onerror = function(err){
			showInfo(err);
			//showInfo('An error occurred while submitting the form. Maybe your file is too big');
		};

		ajaxReq.onload = function(){
			showInfo(this.statusText);
		};

		ajaxReq.send(uploadData);
	})
});

/*function _(el){
    return document.getElementById(el);
}
function uploadFile(){
    let file = _("video_file").files[0];
    let title = _("videoTitle");
    let vid_cat = _("category");
    let vid_desc = _("description");
    let username = _("username");

    if(typeof file === "undefined") {

        _("status").innerHTML = "ERROR: Please browse for a file before clicking the upload button";
        _("progressBar").value = 0;
        return;
    }

    $.get('upload.php?getsize', function(sizelimit) {
        if(file.type !== "video/mp4") {
            let typewarn = "ERROR: You have to select a MP4-File";
            _("status").innerHTML = typewarn;
            _("progressBar").value = 0;
            return;
        }
        if(sizelimit < file.size) {
            let sizewarn = "ERROR: The File is too big! The maximum file size is ";
            sizewarn += sizelimit/(1024*1024);
            sizewarn += "MB";
            _("status").innerHTML = sizewarn;
            _("progressBar").value = 0;
            return;
        }
        let formdata = new FormData();
        formdata.append("video_file", file);
        formdata.append("size", file.size);
        formdata.append("title", title);
        formdata.append("category", vid_cat);
        formdata.append("description", vid_desc);
        formdata.append("username", username);
        let ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", "upload.php");
        ajax.send(formdata);
    });
}
function progressHandler(event){
    _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
    let percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    _("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
}
function completeHandler(event){
    _("status").innerHTML = event.target.responseText;
    _("progressBar").value = 0;
}
function errorHandler(event){
    _("status").innerHTML = "Upload Failed";
}
function abortHandler(event){
    _("status").innerHTML = "Upload Aborted";
}
*/
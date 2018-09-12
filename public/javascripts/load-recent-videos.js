$(document).ready( ()=> {

	$.ajax({
		url: '/getVideo',
		type: 'GET',
		dataType: 'JSON',
		contentType: 'application/json',
		data:JSON.stringify({}),
		processData: false,
	}).done((response)=> {
		response = JSON.parse(response);
		for (let i = 0; i < response.length; i++){
			$('#video-index-'+i+' img').attr('src','images/edgeOfTomorrow.jpg');
			$('#video-index-'+i+' h5.video-length').html(response[i].length);
			$('#video-index-'+i+' h5.video-title').html(response[i].title);
			$('#video-index-'+i+' h5.video-views').html(response[i].views);
			$('#video-index-'+i+' h6.video-doctor').html(response[i].doctor);
		}
	})
});
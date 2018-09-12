$(document).ready( ()=> {

	$.ajax({
		url: '/getRecentVideo',
		type: 'GET'
	}).done((response)=> {
		response = JSON.parse(response);
		for (let i = 0; i < response.length; i++){
			let formalLength = Math.floor(response[i].length / 60) + ':' + response[i].length % 60;
			$('#video-index-'+i+' img').attr('src','images/edgeOfTomorrow.jpg');
			$('#video-index-'+i+' h5.video-length').html(formalLength);
			$('#video-index-'+i+' h5.video-title').html(response[i].title);
			$('#video-index-'+i+' h5.video-views').html(response[i].views);
			$('#video-index-'+i+' h6.video-doctor').html(response[i].doctor);
		}
	})
});
$(document).ready( ()=> {

	$.ajax({
		url: '/getRecentVideo',
		type: 'GET',
		cache: true
	}).done((response)=> {
		response = JSON.parse(response);
		for (let i = 0; i < response.length; i++){

			let formalLength = Math.floor(response[i].length / 60) + ':' + response[i].length % 60;
			let thumbnail = $('#video-index-'+i+' img.thumbnail');

			thumbnail.attr('src',response[i].thumbnailStatic);
			thumbnail.attr('data-src',response[i].thumbnailStatic);
			thumbnail.attr('data-hover',response[i].thumbnailHover);
			$('#video-index-'+i+' h5.video-length').html(formalLength);
			$('#video-index-'+i+' h5.video-title').html(response[i].title);
			$('#video-index-'+i+' h5.video-views').html(response[i].views);
			$('#video-index-'+i+' h6.video-doctor').html(response[i].doctor);
		}
	})
});
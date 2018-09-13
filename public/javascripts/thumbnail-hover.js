$('.card-img-overlay').mouseenter(function () {
	$(this).hide();
	let showOverlay = ()=> {
		$(this).show();
	};
	window.setTimeout(showOverlay, 5000);
});

$('.thumbnail').hover(function() {
		$(this).attr('src', $(this).data('hover'));
	}, function() {
		$(this).attr('src', $(this).data('src'));
});
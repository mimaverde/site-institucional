$(document).ready(function(){
	$('.icon-down').on('click', function(e){
		e.preventDefault();

		if (this.hash !== "") {
			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
				}, 800, function(){

				window.location.hash = hash;
			});
		}
	});

	var area = $('section');

	console.log(area);
});
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


	//AUTOPLAY DOS VIDOES E CANVAS CONFORME POSIÇÃO DO SCROLL
	$(document).scroll(function(ev) {
		ev.stopPropagation();
		ev.preventDefault();
	
		//VIDEO 1 - CASES
		if(($(document).scrollTop() > ($('.qualification').offset().top)) &&
		   ($(document).scrollTop() < $('.exemplos').offset().top) &&
		   !$('.exemplos .video-elements video').attr('autoplay')
		) {
			var vid = $('.exemplos .video-elements video');
			vid.attr('autoplay','true');
			
			vid.load();
		}
			
		// 	//VIDEO 2 - GILLETTE
		// 	if(($(document).scrollTop() > ($('.container-desktop .page-01 .item-18').offset().top)) &&
		// 	   ($(document).scrollTop() < $('.container-desktop .page-01 .item-19').offset().top) &&
		// 	   !$('.container-desktop .page-01 .item-18.video-elements video').attr('autoplay')
		// 	) {
		// 		var vid = $('.container-desktop .page-01 .item-18.video-elements video');
		// 		vid.attr('autoplay','true');
				
		// 		vid.load();
		// 	}
			
		// 	//VIDEO 3 - BRADESCO
		// 	if(($(document).scrollTop() > ($('.container-desktop .page-01 .item-20').offset().top)) &&
		// 	   ($(document).scrollTop() < $('.container-desktop .page-01 .item-21').offset().top) &&
		// 	   !$('.container-desktop .page-01 .item-20.video-elements video').attr('autoplay')
		// 	) {
		// 		var vid = $('.container-desktop .page-01 .item-20.video-elements video');
		// 		vid.attr('autoplay','true');
				
		// 		vid.load();
		// 	}
	
		// 	//CANVAS ANIMATE
		// 	if(($(document).scrollTop() > ($('.container-desktop .page-01 .item-21').offset().top)) &&
		// 	   ($(document).scrollTop() < $('.container-desktop .page-03').offset().top) &&
		// 	   !$('.container-desktop .page-02 .img-canvas').hasClass('animating')
		// 	)
		// 	{
		// 		$('.container-desktop .page-02 .img-canvas').addClass('animating').css('background-position-y', '0').animate({
		// 			'background-position-y': '100%'
		// 		}, 30000, 'linear', function () {
		// 				$('.container-desktop .page-02 .img-canvas').removeClass('animating');
		// 			}
		// 		);
		// 	}
		//}
	});

	//APLICA O BOTÃO DE PLAY POR CIMA DOS VIDEOS
	if (navigator.userAgent.indexOf('Firefox') <= 0) {
		
		for(var i = 0; i < $('.video-elements').length; i++)
		{		
			var videoWrapper = $('.video-elements')[i];
			var video = $('video', videoWrapper)[0];

			var formatVideoPlayButton = function() {
				videoWrapper.insertAdjacentHTML('beforeend', '\
					<svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
						<circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
						<polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
					</svg>\
				');
			};

			var hideVideoPlayButton = function(ev) {
				$(ev.target).parents('.video-elements').find('video')[0].play();
				video.classList.remove('has-media-controls-hidden');
			};
			
			if (videoWrapper.contains(video)) {
				formatVideoPlayButton();
				video.classList.add('has-media-controls-hidden');
				
				$('.video-overlay-play-button').on('click', {ev: event }, hideVideoPlayButton);
			}
		}
	}
});

var vids = $("video"); 
$.each(vids, function(){
       this.controls = false; 
}); 


function endedPlayVideo(evType, evObj)
{
	var vid = $(evObj.target);
	vid.removeAttr('autoplay');
	vid.next('.video-overlay-play-button').show();
}

function removePlayButton(evType, evObj)
{
	var vid = $(evObj.target);
	vid.next('.video-overlay-play-button').hide();
}
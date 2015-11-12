$( document ).ready(function() {

	scrollConfig();

	$().on('click', function() {
		TweenMax.to($slider, opt.speed, {
	        x: left,
	        ease: opt.ease,
	    });
	});

});
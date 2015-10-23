$( document ).ready(function() {

	resizeDiv();

	window.onresize = function(event) {
		resizeDiv();
	}

	function resizeDiv() {
		vpw = $(window).width();
		vph = $(window).height();
		$("#section-1").css({"height": vph + "px"});
		$("#section-2").css({"margin-top": vph + "px"});
	}

			TweenMax.from("#coffee", 1, {opacity:0, left:-80, ease: Power4.easeOut, force3D:true});
			TweenMax.from("#ipad", 1, {opacity:0, top:-300, ease: Power4.easeOut, delay:0.4, force3D:true});
			TweenMax.from("#notebook", 1, {opacity:0, bottom:-300, ease: Power4.easeOut, delay:0.9, force3D:true});
			TweenMax.from("#iphone", 1.5, {opacity:0, y:'+=50', ease: Power4.easeOut, delay:1.5, force3D:true});
			TweenMax.from("#mags", 1, {opacity:0, right:-100, ease: Power4.easeOut, delay:1.8, force3D:true});
			TweenMax.from("h2", 1, {opacity:0, y:'+=50', ease: Power2.easeOut, delay:2, force3D:true});
			TweenMax.staggerFrom("h1, h5", 1, {opacity:0, y:'+=50', ease: Power2.easeOut, delay:2.5, force3D:true}, 0.1);
	
	/*$("body").queryLoader2({
		
		barColor: "#8d1725",
	    backgroundColor: "#000",
	    percentage: true,
	    barHeight: 10,
	    minimumTime: 1000,
	    fadeOutTime: 200,
		
		onComplete: function() {

			TweenMax.to("body", 0.1, {opacity:1, ease: Power0.easeOut, force3D:true, onStart: function() {
				TweenMax.to('#loading', 0.1, {autoAlpha:0, ease: Power0.easeOut, force3D:true});
			}});

		}
	});*/
	/*enquire.register("screen and (max-width:820px)", {
		match : function() {
			TweenMax.to("body", 0.01, {opacity:0, ease: Power0.easeOut, force3D:true});
			TweenMax.to("body", 0.6, {opacity:1, ease: Power0.easeOut, delay:0.8, force3D:true});

			var slidesNav = $('.fp-slidesNav.bottom');
			$('body').addClass( "mobV" );

			//Section 5 video removal
			var videoDiv = $('#video-bg');
			videoDiv.empty();
		},
		unmatch : function() {
			TweenMax.to("body", 0.01, {opacity:0, ease: Power0.easeOut, force3D:true});
			TweenMax.to("body", 0.6, {opacity:1, ease: Power0.easeOut,delay:0.8, force3D:true});

			$('body').removeClass( "mobV" );

			//Section 5 video addition
			var videoDiv = $('#video-bg');
			videoDiv.append('<video autoplay loop muted id="myVideo" ><source src="videos/flowers.mp4" type="video/mp4"><source src="videos/flowers.webm" type="video/webm"></video>');
		}
	});*/

});
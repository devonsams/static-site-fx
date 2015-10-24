$( document ).ready(function() {

	resizeDiv();

	window.onresize = function(event) {
		resizeDiv();
	}

	function resizeDiv() {
		vpw = $(window).width();
		vph = $(window).height();
		$(".panels").css({"min-height": vph + 50 + "px"});
		$("#section-2").css({"margin-top": vph + "px"});
	}

			
			
			TweenMax.from("#coffee", 1, {opacity:0, x:'-=20', y:'+=30', ease: Power2.easeInOut, force3D:true});
			TweenMax.from("#notebook", 1, {opacity:0, x:'+=20', y:'-=30', ease: Power2.easeInOut, delay:0.2, force3D:true});
			TweenMax.from("#mob-nav", 1.8, {opacity:0, ease: Power0.easeOut, delay:0.2, force3D:true});
			TweenMax.from("#tagline-growth", 1, {opacity:0, ease: Power0.easeInOut, delay:1.3, force3D:true});
			
	
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
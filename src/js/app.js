$( document ).ready(function() {

	resizeDiv();

	window.onresize = function(event) {
		resizeDiv();
	}

	function resizeDiv() {
		vpw = $(window).width();
		vph = $(window).height();
		$("#section-1").css({"min-height": vph + 50 + "px"});
		//$("#section-2").css({"margin-top": vph + "px"});
	}

var controller = new ScrollMagic.Controller();

// Home Animation Setup
var header_tween = TweenMax.staggerFrom('.header-item', 1, {
	opacity:0, 
	x:'-=50',
	display:"none",
	ease: Power4.easeInOut,
	force3D: true
}, 0.1);

// Nav Animation Setup
var nav_tween = TweenMax.from('#mainNav', 0.7, {
	opacity:0, 
	y:-100,	
	ease: Power0.easeOut,
	display:"none",
	delay: 1
});

// About Animation Setup
var about_tween = TweenMax.staggerFrom('.col-md-6', 0.6, {
		opacity:0, 
		x:'+=200',	
		ease: Power2.easeInOut
	}, 0.2);

// Aspire Animation Setup
var aspire_tween = TweenMax.staggerFrom('.aspire-item', 0.4, {
	opacity:0, 
	x:'-=250',	
	ease: Power2.easeOut,
	force3D: true
}, 0.2);

// Methods Animation Setup
var methods_tween = TweenMax.staggerFrom('.method-item', 0.4, {
	opacity:0, 
	x:'+=100',	
	ease: Power4.easeOut
}, 0.1);

// Header Scene
var header_scene = new ScrollMagic.Scene({
  triggerElement: '.header-content'
})
.setTween(header_tween);

// About Scene
var about_scene = new ScrollMagic.Scene({
  triggerElement: '#about'
})
.setTween(about_tween);

// Aspire Scene
var aspire_scene = new ScrollMagic.Scene({
  triggerElement: '#aspire'
})
.setTween(aspire_tween);

// Methods Scene
var methods_scene = new ScrollMagic.Scene({
  triggerElement: '#methods'
})
.setTween(methods_tween);

controller.addScene([
  about_scene,
  header_scene,
  aspire_scene,
  methods_scene
]);


	// change behaviour of controller to animate scroll instead of jump
	controller.scrollTo(function (newpos) {
		TweenMax.to(window, 0.5, {scrollTo: {y: newpos}});
	});

	//  bind scroll to anchor links
	$(document).on("click", "a[href^='#']", function (e) {
		var id = $(this).attr("href");
		if ($(id).length > 0) {
			e.preventDefault();

			// trigger scroll
			controller.scrollTo(id);

				// if supported by the browser we can even update the URL.
			if (window.history && window.history.pushState) {
				history.pushState("", document.title, id);
			}
		}
	});


	
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
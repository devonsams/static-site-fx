$( document ).ready(function() {

	resizeDiv();

	window.onresize = function(event) {
		resizeDiv();
	}

	function resizeDiv() {
		vpw = $(window).width();
		vph = $(window).height();
		$("#loading").css({"min-height": vph + "px"});
	}
	
	$("body").queryLoader2({
		
		barColor: "#fff",
	    backgroundColor: "#fff",
	    percentage: false,
	    barHeight: 1,
	    minimumTime: 800,
	    fadeOutTime: 1000,
	    deepSearch: true,
		
		onComplete: function() {

			TweenMax.to('#loading', 0.1, {
				autoAlpha:0, 
				ease: Power0.easeOut, 
				force3D:true
			});
			TweenMax.staggerFrom('.header-item', 1, {
				opacity:0, 
				x:'-=50',
				display:"none",
				ease: Power4.easeInOut,
				force3D: true,
				delay:0.1
			}, 0.1);
			TweenMax.from('#mainNav', 0.7, {
				opacity:0, 
				y:-100,	
				ease: Power0.easeOut,
				display:"none",
				delay: 1
			});
		}
	});

	var controller = new ScrollMagic.Controller();

/*===================================================================
	SETUP
====================================================================*/	

	// About Animation Setup
	var about_tween = TweenMax.staggerFrom('.about-item', 1, {
		opacity:0, 
		scale:0.5,	
		ease: Elastic.easeOut.config(1, 0.5)
	}, 0.05);

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

	// Agency Animation Setup
	var agency_tween = TweenMax.staggerFrom('.agency-item', 0.4, {
		opacity:0, 
		x:'+=100',	
		ease: Power4.easeOut
	}, 0.1);

	// Split-Profile Animation Setup
	var splitProfile_tween = TweenMax.staggerFrom('.splitProfile-item', 1, {
		opacity:0, 
		scale:0,	
		ease: Elastic.easeOut.config(1, 0.5)
	}, 0.1);

/*===================================================================
	SCENES
====================================================================*/	
	
	var startingHash = window.location.hash ? '#' + window.location.hash : null;
	toggleActiveNav(startingHash);

	function progressHashSync(e) {
		var target = $(e.target.triggerElement());
		var nextScene = e.progress ? target : target.prev('section');
		var hash = nextScene.length ? '#' + nextScene.attr('id') : null
		updateHash(hash);
		toggleActiveNav(hash);
	}

	function updateHash(hash) {
        if (history.pushState) {
        	if (hash) {
	    		history.pushState(null, null, hash);
	    	} else {
	    		history.pushState("", document.title, window.location.pathname);
	    	}
		}
		else {
		    location.hash = hash || '';
		}
	}

	function toggleActiveNav(hash) {
		hash = hash || '#page-top';
		$('.page-scroll').removeClass('active');
		if (hash) $('.page-scroll[href="' + hash + '"]').addClass('active');
	}

	function dynamicDuration() {
	  	if (this.triggerElement) return $(this.triggerElement()).outerHeight();
	  	return 0
	}

	function createScene(hash, offset, duration, tween) {
		var scene = new ScrollMagic.Scene({
		  triggerElement: hash,
		  offset: offset || 0,
		  duration: duration || 0
		})
		//.addIndicators()
		.on('progress', progressHashSync);
		if (tween) scene.setTween(tween)
		return scene;
	}

	var about_scene1 = createScene('#about', 0, dynamicDuration);
	var about_scene2 = createScene('#about', -200, 0, about_tween);

	var aspire_scene1 = createScene('#aspire', 50, dynamicDuration);
	var aspire_scene2 = createScene('#aspire', -200, 0, aspire_tween);

	var methods_scene1 = createScene('#methods', 0, dynamicDuration);
	var methods_scene2 = createScene('#methods', -200, 0, methods_tween);

	var agency_scene1 = createScene('#agency', 0, dynamicDuration);
	var agency_scene2 = createScene('#agency',-200, 0, agency_tween);

	var splitProfile_scene1 = createScene('#contact', 0, dynamicDuration);
	var splitProfile_scene2 = createScene('#contact', -200, 0, splitProfile_tween);

/*===================================================================
	ADD
====================================================================*/	

	controller.addScene([
	  about_scene1,
	  aspire_scene1,
	  methods_scene1,
	  agency_scene1,
	  splitProfile_scene1,
	  about_scene2,
	  aspire_scene2,
	  methods_scene2,
	  agency_scene2,
	  splitProfile_scene2
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
});
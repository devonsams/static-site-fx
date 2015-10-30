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
				autoAlpha: 0,
				opacity:0, 
				x:'-=50',
				display:"none",
				ease: Power4.easeInOut,
				force3D: true,
				delay:0.1
			}, 0.1);
			TweenMax.from('#mainNav', 0.7, {
				autoAlpha: 0,
				opacity:0, 
				y:-100,	
				ease: Power0.easeOut,
				display:"none",
				delay: 1
			});
		}
	});

	var controller = new ScrollMagic.Controller({container: "#signatureWrapper"});

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
		$('.page-scroll[href="' + hash + '"]').addClass('active');
	}

	function createScene(hash, tween, offset) {
		return new ScrollMagic.Scene({
		  triggerElement: hash,
		  offset: offset || 0,
		  duration: function (e) {
		  	if (this.triggerElement) return $(this.triggerElement()).outerHeight();
		  	return 0
		  }
		})
		.addIndicators()
		//.setTween(tween)
		.on('progress', progressHashSync);
	}

	var about_scene = createScene('#about', about_tween);
	var aspire_scene = createScene('#aspire', aspire_tween, 50);
	var methods_scene = createScene('#methods', methods_tween);
	var agency_scene = createScene('#agency', agency_tween);
	var splitProfile_scene = createScene('#contact', splitProfile_tween);

/*===================================================================
	ADD
====================================================================*/	

	controller.addScene([
	  about_scene,
	  aspire_scene,
	  methods_scene,
	  agency_scene,
	  splitProfile_scene
	]);

	if (isMobile()) {
		// configure iScroll
		var myScroll = new IScroll('#signatureWrapper', {
			// don't scroll horizontal
			scrollX: false,
			// but do scroll vertical
			scrollY: true,
			// show scrollbars
			scrollbars: true,
			// deactivating -webkit-transform because pin wouldn't work because of a webkit bug: https://code.google.com/p/chromium/issues/detail?id=20574
			// if you dont use pinning, keep "useTransform" set to true, as it is far better in terms of performance.
			useTransform: false,
			// deativate css-transition to force requestAnimationFrame (implicit with probeType 3)
			useTransition: false,
			// set to highest probing level to get scroll events even during momentum and bounce
			// requires inclusion of iscroll-probe.js
			probeType: 3,
			// pass through clicks inside scroll container
			click: true 
		});
				
		// overwrite scroll position calculation to use child's offset instead of container's scrollTop();
		controller.scrollPos(function () {
			return -myScroll.y;
		});

		// thanks to iScroll 5 we now have a real onScroll event (with some performance drawbacks)
		myScroll.on("scroll", function () {
			controller.update();
		});
	}

	// change behaviour of controller to animate scroll instead of jump
	controller.scrollTo(function (newpos) {
		TweenMax.to("#signatureWrapper", 0.5, {scrollTo: {y: newpos}});
	});

	//  bind scroll to anchor links
	$(document).on("click", "a[href^='#']", function (e) {
		var id = $(this).attr("href");
		var newPos = $(id).offset().top + $("#signatureWrapper").scrollTop();
		if ($(id).length > 0) {
			e.preventDefault();

			// trigger scroll
			controller.scrollTo(newPos);

				// if supported by the browser we can even update the URL.
			if (window.history && window.history.pushState) {
				history.pushState("", document.title, id);
			}
		}
	});
});
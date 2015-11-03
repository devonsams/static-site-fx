function scrollConfig() {

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
	
	var navController = new ScrollMagic.Controller();
	var animationController = new ScrollMagic.Controller();
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

	function dynamicDuration() {
	  	if (this.triggerElement) return $(this.triggerElement()).outerHeight();
	  	return 0
	}

	function createScene(options) {
		options = options || {};
		var scene = new ScrollMagic.Scene({
		  triggerElement: options.hash,
		  offset: options.offset || 0,
		  duration: options.duration || 0
		});
		
		if (options.progress) scene.on('progress', options.progress);
		if (options.tween) scene.setTween(options.tween)

		//scene.addIndicators();

		return scene;
	}

	var about_scene1 = createScene({
		hash: '#about', 
		offset: 0, 
		//duration: dynamicDuration,
		progress: progressHashSync
	});
	var about_scene2 = createScene({
		hash: '#about', 
		offset: -200, 
		duration: 0,
		tween: about_tween
	});

	var aspire_scene1 = createScene({
		hash: '#aspire', 
		offset: 0, 
		//duration: dynamicDuration,
		progress: progressHashSync
	});
	var aspire_scene2 = createScene({
		hash: '#aspire', 
		offset: -200, 
		duration: 0,
		tween: aspire_tween
	});

	var methods_scene1 = createScene({
		hash: '#methods', 
		offset: 0, 
		//duration: dynamicDuration,
		progress: progressHashSync
	});
	var methods_scene2 = createScene({
		hash: '#methods', 
		offset: -200, 
		duration: 0,
		tween: methods_tween
	});

	var agency_scene1 = createScene({
		hash: '#agency', 
		offset: 0, 
		//duration: dynamicDuration,
		progress: progressHashSync
	});
	var agency_scene2 = createScene({
		hash: '#agency', 
		offset: -200, 
		duration: 0,
		tween: agency_tween
	});

	var splitProfile_scene1 = createScene({
		hash: '#contact', 
		offset: 0, 
		//duration: dynamicDuration,
		progress: progressHashSync
	});
	var splitProfile_scene2 = createScene({
		hash: '#contact', 
		offset: -200, 
		duration: 0,
		tween: splitProfile_tween
	});

/*===================================================================
	ADD
====================================================================*/	

	navController.addScene([
	  about_scene1,
	  aspire_scene1,
	  methods_scene1,
	  agency_scene1,
	  splitProfile_scene1,
	]);
	
	animationController.addScene([
	  about_scene2,
	  aspire_scene2,
	  methods_scene2,
	  agency_scene2,
	  splitProfile_scene2
	]);
	

	if (isMobile()) {
		// configure iScroll
		var myScroll = new IScroll('#signatureWrapper', {
			// don't scroll horizontal
			scrollX: false,
			// but do scroll vertical
			scrollY: true,
			// show scrollbars
			scrollbars: false,
			// deactivating -webkit-transform because pin wouldn't work because of a webkit bug: https://code.google.com/p/chromium/issues/detail?id=20574
			// if you dont use pinning, keep "useTransform" set to true, as it is far better in terms of performance.
			useTransform: true,
			// deativate css-transition to force requestAnimationFrame (implicit with probeType 3)
			useTransition: true,
			// set to highest probing level to get scroll events even during momentum and bounce
			// requires inclusion of iscroll-probe.js
			probeType: 3,
			// pass through clicks inside scroll container
			click: true 
		});
				
		// overwrite scroll position calculation to use child's offset instead of container's scrollTop();
		navController.scrollPos(function () {
			return -myScroll.y;
		});

		// thanks to iScroll 5 we now have a real onScroll event (with some performance drawbacks)
		myScroll.on("scroll", function () {
			navController.update();
		});
	}
	
	// change behaviour of controller to animate scroll instead of jump
	navController.scrollTo(function (newpos) {
		TweenMax.to('#signatureWrapper', 0.5, {scrollTo: {y: newpos}});
	});
	
	//  bind scroll to anchor links
	$(document).on("click", "a[href^='#']", function (e) {
		var id = $(this).attr("href");
		if (id) {
			e.preventDefault();
			goToScene(id);
		}
	});

	function goToScene(id) {
		if (!id || !$(id).length) return;

		var newPos = $(id).offset().top + $("#signatureWrapper").scrollTop();
		newPos = (id === '#page-top' ? 0 : newPos);
		
		// trigger scroll
		navController.scrollTo(newPos);

			// if supported by the browser we can even update the URL.
		if (window.history && window.history.pushState) {
			history.pushState("", document.title, id);
		}
	}
}
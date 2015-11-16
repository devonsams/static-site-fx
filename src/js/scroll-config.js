function scrollConfig() {

	resizeDiv();

	window.onresize = function(event) {
		resizeDiv();
		TweenMax.to(".sliderCtrl .slide-left.back-btn", 0.1, {
			autoAlpha: 0,
			ease: Power4.easeOut
		});
	}

	function resizeDiv() {
		vpw = $(window).width();
		vph = $(window).height();
		$("#loading").css({"min-height": vph + "px"});
		$(".slide").css({"width": vpw + "px"});
		$(".sliderWrapper").css({"width": (2 * vpw) + "px"});
		//$(".slide-1").css({"left": "0"});
		//$(".slide-2").css({"left": vpw + "px"});
		$(".slide-1").css({"transform": "translate3d(0px, 0px, 0px)"});
		$(".slide-2").css({"transform": "translate3d(" + vpw + "px, 0px, 0px)"});
	}

	$(".slide-right").on('click', function() {
		var panelID = $(this).closest('section').attr('id');
		var slide1 = "#" + panelID + ' .slide-1';
		var slide2 = "#" + panelID + ' .slide-2';
		var leftIndicator = "#" + panelID + ' .sliderCtrl .slide-left.dot';
		var rightIndicator = "#" + panelID + ' .sliderCtrl .slide-right.dot';
		var backButton = "#" + panelID + ' .sliderCtrl .back-btn';
		vpw = $(window).width();

		$(leftIndicator).removeClass('active');
		$(rightIndicator).addClass('active');

		TweenMax.to(backButton, 0.1, {
			autoAlpha: 1,
			ease: Power4.easeOut
		});
		TweenMax.to(slide1, 0.8, {
			x: "-" + vpw,
			ease: Power4.easeOut,
			autoAlpha:0,
			force3D: true,
			onComplete: function () {
		      	if (myScroll) {
		      		myScroll.refresh();
		      	}
	      	}
		});
		TweenMax.to(slide2, 0.8, {
			x: "-" + vpw,
			height: "100%",
			ease: Power4.easeOut,
			autoAlpha: 1,
			force3D: true,
			onComplete: function () {
		      	if (myScroll) {
		      		myScroll.refresh();
		      	}
	      	}
		});
	});

	$(".slide-left").on('click', function() {
		var panelID = $(this).closest('section').attr('id');
		var slide1 = "#" + panelID + ' .slide-1';
		var slide2 = "#" + panelID + ' .slide-2';
		var leftIndicator = "#" + panelID + ' .sliderCtrl .slide-left.dot';
		var rightIndicator = "#" + panelID + ' .sliderCtrl .slide-right.dot';
		var backButton = "#" + panelID + ' .sliderCtrl .back-btn';
		vpw = $(window).width();

		$(leftIndicator).addClass('active');
		$(rightIndicator).removeClass('active');


		TweenMax.to(backButton, 0.1, {
			autoAlpha: 0,
			ease: Power4.easeOut
		});
	    TweenMax.to(slide1, 0.8, {
	      x: "+=" + vpw,
	      ease: Power4.easeOut,
	      autoAlpha: 1,
	      force3D: true,
	      onComplete: function () {
	      	if (myScroll) {
	      		myScroll.refresh();
	      	}
	      }
	    });
	    TweenMax.to(slide2, 0.8, {
	      x: "+=" + vpw,
	      height:0,
	      ease: Power4.easeOut,
	      autoAlpha: 0,
	      force3D: true,
	      onComplete: function () {
	      	if (myScroll) {
	      		myScroll.refresh();
	      	}
	      }
	    });
	});

	$("#video-modal-open").on('click', function() {
		//$("#video-modal").addClass('show');

		TweenMax.fromTo("#video-modal", 0.4, {
				y: "-150"
			},
			{
				autoAlpha:1,
				display: "block",
				ease: Power4.easeOut,
				force3D: true,
				y: 0
			}
		);

		TweenMax.from("#video-modal .row", 0.6, {
			autoAlpha: 0,
			top: "60%",
			ease: Power2.easeOut,
			force3D: true,
			delay: 0.2
		});
	});
	
	$(".video-modal-close-trigger").on('click', function() {
		TweenMax.to("#video-modal", 0.4, {
				autoAlpha: 0,
				display:"none",
				y: "-150",
				ease: Power4.easeOut,
			});
	});
	
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

			TweenMax.staggerFromTo('.header-item', 1, 
			{
				autoAlpha:0,
				x:'-=50',
				force3D: true,
			},
			{
			 	autoAlpha:1,
			 	display: "inline-block",
			 	ease: Power4.easeInOut,
			 	x:0,
			 	force3D: true,
			 	delay:0.2
			}, 0.1);
			TweenMax.fromTo('#mainNav', 0.7, 
			{
				autoAlpha:0, 
				y:-100,	
			},
			{
				autoAlpha:1,
				y:0,
				ease: Power0.easeOut,
				display:"block",
				delay: 0.4
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
	/*
	function progressHashSync(e) {
		var target = $(e.target.triggerElement());
		var nextScene = e.progress ? target : target.prev('section');
		var hash = nextScene.length ? '#' + nextScene.attr('id') : null
		updateHash(hash);
		toggleActiveNav(hash);
	}
	
	*/

	function watcher(selector) {
		$(selector)
			.inview({ offsetTop: 200, offsetBottom: -200 })
			.on('scrolledin', function () { 
				updateHash(selector);
				toggleActiveNav(selector);
			});
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


	var about_scene = createScene({
		hash: '#about', 
		offset: -200, 
		duration: 0,
		tween: about_tween
	});


	var aspire_scene = createScene({
		hash: '#aspire', 
		offset: -200, 
		duration: 0,
		tween: aspire_tween
	});


	var methods_scene = createScene({
		hash: '#methods', 
		offset: -200, 
		duration: 0,
		tween: methods_tween
	});


	var agency_scene = createScene({
		hash: '#agency', 
		offset: -200, 
		duration: 0,
		tween: agency_tween
	});


	var splitProfile_scene = createScene({
		hash: '#contact', 
		offset: -200, 
		duration: 0,
		tween: splitProfile_tween
	});

/*===================================================================
	ADD
====================================================================*/	

	animationController.addScene([
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
		animationController.scrollPos(function () {
			return -myScroll.y;
		});

		// thanks to iScroll 5 we now have a real onScroll event (with some performance drawbacks)
		myScroll.on("scroll", function () {
			animationController.update();
		});

		// change behaviour of controller to animate scroll instead of jump
		animationController.scrollTo(function (newpos) {
			//TweenMax.to('#signatureWrapper', 0.5, {scrollTo: {y: newpos}});
			myScroll.scrollTo(0, -(newpos));
		});
	} else {
		watcher('#header');
		watcher("#about");
		watcher("#aspire");
		watcher("#methods");
		watcher("#agency");
		watcher("#contact");

		// change behaviour of controller to animate scroll instead of jump
		animationController.scrollTo(function (newpos) {
			//TweenMax.to('#signatureWrapper', 0.5, {scrollTo: {y: newpos}});
			$('div').inview('scrollTo', newpos);
		});
	}
	
	//  bind scroll to anchor links
	$(document).on("click", "a[href^='#']", function (e) {
		var id = $(this).attr("href");
		if (id) {
			e.preventDefault();
			toggleActiveNav(id);
			goToScene(id);
		}
	});

	function goToScene(id) {
		if (!id || !$(id).length) return;

		var newPos = $(id).offset().top + $("#signatureWrapper").scrollTop();
		newPos = (id === '#header' ? 0 : newPos);
		
		// trigger scroll
		animationController.scrollTo(newPos);

		// if supported by the browser we can even update the URL.
		if (window.history && window.history.pushState) {
			history.pushState("", document.title, id);
		}
	}

	var startingHash = window.location.hash;
	var splitHash = startingHash.split('/');

	if (startingHash) {
		var hashington = splitHash.length > 1 ? splitHash[0] : startingHash;
		toggleActiveNav(hashington);
		goToScene(hashington)
	} else {
		toggleActiveNav('#header');
	}
}
$( document ).ready(function() {

	resizeDiv();

	window.onresize = function(event) {
		resizeDiv();
		sections = gatherSections();
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
	
	var sections = gatherSections();

	function gatherSections() {
		var sections = [];
		$('section').each(function() {
			var top = $(this).offset().top - 200;
			var height = top + $(this).height();
			sections.push({
				top: top,
				height: height,
				hash: '#' + $(this).attr('id')
			});
		});
		return sections;
	}

	function getSectionByYOffset(event) {
		var section;
		var y = window.pageYOffset + (event.progress ? 400 : 10);
		$.each(sections, function() {
			if (this.top < y && this.height > y) {
	            section = this;
	        }
		});
		return section;
	}

	function progressHashSync(event) {
		var section = getSectionByYOffset(event);
		var hash = section ? section.hash || null : null;
		console.log(hash);
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
		$('.page-scroll').removeClass('active');
		if (hash) $('.page-scroll[href="' + hash + '"]').addClass('active');
	}

	// About Scene
	var about_scene = new ScrollMagic.Scene({
	  triggerElement: '#about',
	  offset: -200,
	})
	.addIndicators()
	.setTween(about_tween)
	//.setClassToggle(".about-tab", "active")
	.on('progress', progressHashSync);

	// Aspire Scene
	var aspire_scene = new ScrollMagic.Scene({
	  triggerElement: '#aspire',
	  offset: -200,
	})
	.setTween(aspire_tween)
	.addIndicators()
	//.setClassToggle(".aspire-tab", "active")
	.on('progress', progressHashSync);

	// Methods Scene
	var methods_scene = new ScrollMagic.Scene({
	  triggerElement: '#methods',
	  offset: -200,
	})
	.setTween(methods_tween)
	//.setClassToggle(".methods-tab", "active")
	.on('progress', progressHashSync);

	// Agency Scene
	var agency_scene = new ScrollMagic.Scene({
	  triggerElement: '#agency',
	  offset: -200,
	})
	.setTween(agency_tween)
	//.setClassToggle(".agency-tab", "active")
	.on('progress', progressHashSync);

	// Split-Profile Scene
	var splitProfile_scene = new ScrollMagic.Scene({
	  triggerElement: '#split-profile',
	  offset: -200,
	})
	.setTween(splitProfile_tween)
	//.setClassToggle(".contact-tab", "active")
	.on('progress', progressHashSync);

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
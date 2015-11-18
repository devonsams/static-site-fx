$( document ).ready(function() {

  if (!isMobile()) scrollConfig();

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
/*
	var aspireLooper = $('#aspire').looper({
		interval: false
	}).data('looperjs');

	var agencyLooper = $('#agency').looper({
		interval: false
	}).data('looperjs');

	var methodsLooper = $('#methods').looper({
		interval: false
	}).data('looperjs');

	function methods1( ) {
		updateHash('#methods');
		$('.methods-nav').removeClass('active');
		$('#methods-first').addClass('active');
		methodsLooper.to(1);
	}

	function methods2() {
		updateHash('#methods/more');
		$('.methods-nav').removeClass('active');
		$('#methods-second').addClass('active');
		methodsLooper.to(2);
	}

	function agency1( ) {
		updateHash('#agency');
		$('.agency-nav').removeClass('active');
		$('#agency-first').addClass('active');
		agencyLooper.to(1);
	}

	function agency2() {
		updateHash('#agency/more');
		$('.agency-nav').removeClass('active');
		$('#agency-second').addClass('active');
		agencyLooper.to(2);
	}

	function aspire1( ) {
		updateHash('#aspire');
		$('.aspire-nav').removeClass('active');
		$('#aspire-first').addClass('active');
		aspireLooper.to(1);
	}

	function aspire2() {
		updateHash('#aspire/more');
		$('.aspire-nav').removeClass('active');
		$('#aspire-second').addClass('active');
		aspireLooper.to(2);
	}

	$('#aspire-read-more').on('click', aspire2);
	$('#aspire-first').on('click', aspire1);
	$('#aspire-second').on('click', aspire2);

	$('#agency-read-more').on('click', agency2);
	$('#agency-first').on('click', agency1);
	$('#agency-second').on('click', agency2);

	$('#methods-read-more').on('click', methods2);
	$('#methods-first').on('click', methods1);
	$('#methods-second').on('click', methods2);



	$(window).bind('hashchange', function(e) {
		if (window.location.hash === '#aspire') {
			aspire1();
		}
		if (window.location.hash === '#agency') {
			agency1();
		}
		if (window.location.hash === '#methods') {
			methods1();
		}
	});

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
	*/

});

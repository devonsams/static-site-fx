function scrollConfig() {

  watcher('#header');
  watcher("#about");
  watcher("#aspire");
  watcher("#methods");
  watcher("#agency");
  watcher("#contact");

  var animationController = new ScrollMagic.Controller();

  var about_scene = createScene({
    hash: '#about',
    offset: -200,
    duration: 0,
    tween: TweenMax.staggerFrom('.about-item', 1, {
      opacity:0,
      scale:0.5,
      ease: Elastic.easeOut.config(1, 0.5)
    }, 0.05)
  });


  var aspire_scene = createScene({
    hash: '#aspire',
    offset: -200,
    duration: 0,
    tween: TweenMax.staggerFrom('.aspire-item', 0.4, {
      opacity:0,
      x:'-=250',
      ease: Power2.easeOut,
      force3D: true
    }, 0.2)
  });


  var methods_scene = createScene({
    hash: '#methods',
    offset: -200,
    duration: 0,
    tween: TweenMax.staggerFrom('.method-item', 0.4, {
      opacity:0,
      x:'+=100',
      ease: Power4.easeOut
    }, 0.1)
  });


  var agency_scene = createScene({
    hash: '#agency',
    offset: -200,
    duration: 0,
    tween: TweenMax.staggerFrom('.agency-item', 0.4, {
      opacity:0,
      x:'+=100',
      ease: Power4.easeOut
    }, 0.1)
  });


  var splitProfile_scene = createScene({
    hash: '#contact',
    offset: -200,
    duration: 0,
    tween: TweenMax.staggerFrom('.splitProfile-item', 1, {
      opacity:0,
      scale:0,
      ease: Elastic.easeOut.config(1, 0.5)
    }, 0.1)
  });

  animationController.addScene([
    about_scene,
    aspire_scene,
    methods_scene,
    agency_scene,
    splitProfile_scene
  ]);

  // change behaviour of controller to animate scroll instead of jump
  animationController.scrollTo(function (newpos) {
    //TweenMax.to('#signatureWrapper', 0.5, {scrollTo: {y: newpos}});
    $('div').inview('scrollTo', newpos);
  });

    //  bind scroll to anchor links
  $(document).on("click", "a[href^='#']", function (e) {
    var id = $(this).attr("href");
    if (id) {
      e.preventDefault();
      toggleActiveNav(id);
      goToScene(id);
    }
  });

  var startingHash = window.location.hash;
  var splitHash = startingHash.split('/');

  if (startingHash) {
    var hashington = splitHash.length > 1 ? splitHash[0] : startingHash;
    toggleActiveNav(hashington);
    goToScene(hashington)
  } else {
    toggleActiveNav('#header');
  }

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

  function goToScene(id) {
    if (!id || !$(id).length) return;

    var newPos = $(id).offset().top;
    newPos = (id === '#header' ? 0 : newPos);

    // trigger scroll
    animationController.scrollTo(newPos);

    // if supported by the browser we can even update the URL.
    if (window.history && window.history.pushState) {
      history.pushState("", document.title, id);
    }
  }
}

(function ($) {

  var $container = $('#signatureWrapper');
  var $window = $(window);
  var _watch = [];
  var _buffer;
  var _disabled;
  var _direction;
  var _lastScrollTop = 0;

  $container.on('scroll', scroll);

  function scroll(e) {
    if ( !_buffer && !_disabled ) {
      _buffer = setTimeout(function () {
        setDirection( e );
        checkInView( e );
        _buffer = null;
      }, 300);
    }
  }

  function setDirection(e) {
    var st = $(e.currentTarget).scrollTop();
    if (st > _lastScrollTop) {
      _direction = 'down';
     } else {
      _direction = 'up';
     }
     _lastScrollTop = st;
  }

  /*
  when you enter it either from the top or the bottom
  on menu click
  need to be able to change url hash and active nav
  then trigger scroll (without triggering the 
  scrolledin and scrolledout events)

  scrolling down
  $('#signatureWrapper').scrollTop() + $(window).height() > $('#about').position().top + 200

  scrolling up
  $('#signatureWrapper').scrollTop() < $('#about').position().top + $('#about').outerHeight() - 200

  */

  function Tester() {
    this.lastTop = undefined;
    this.lastBottom = undefined;
  }

  function TesterPrototype() {
    this.testUp = function(elBottom, vpTop) {
      var last = this.lastBottom === undefined ? undefined : this.lastBottom;
      if (vpTop < elBottom) this.lastBottom = !last || elBottom > last ? elBottom : last;
      return (vpTop < elBottom && (!last || elBottom< last)); // keep greatest
    };

    this.testDown = function(elTop, vpBottom) {
      var last = this.lastTop === undefined ? undefined : this.lastTop;
      this.lastTop = !last || elTop < last ? elTop : last;
      return (vpBottom >= elTop && (!last || elTop > last)); // keep least
    };
  }

  Tester.prototype = new TesterPrototype();

  function checkInView( e ) {
    var tester = new Tester();
    var vpTop = $container.scrollTop();
    var vpBottom = vpTop + $window.height();
    var bestMatch;

    if (_direction === 'down') {
      $.each(_watch, function() {
        var top = this.element.position().top + (this.options.offsetTop || 0);
        if (tester.testDown(top, vpBottom)) {
          bestMatch = this;
        }
      });
    } else if (_direction === 'up') {
      $.each(_watch, function() {
        var bottom = this.element.position().top + this.element.outerHeight() + (this.options.offsetBottom || 0);
        if (tester.testUp(bottom, vpTop)) {
          bestMatch = this;
        }
      });
    }

    if (bestMatch) {
      execScrolledin(bestMatch, e);    
    }
  }

  function execScrolledin(data, e) {
    if (data.options.scrolledin) {
      data.options.scrolledin.call(this.element, e);
    }
    data.element.trigger('scrolledin', e);
  }

  function monitor( element, options ) {
    var item = { 
      element: element, 
      options: options
    };
    _watch.push(item);
    return item;
  }

  function unmonitor( item ) {
    for ( var i=0;i<_watch.length;i++ ) {
      if ( _watch[i] === item ) {
        _watch.splice( i, 1 );
        item.element = null;
        break;
      }
    }
    console.log( _watch );
  }

  var pluginName = 'inview';
  var settings = {
    scrolledin: null,
    scrolledout: null,
    offsetTop: null,
    offsetBottom: null
  };

  var methods = {
    scrollTo: function(newPos) {
      _disabled = true;
      TweenMax.to('#signatureWrapper', 0.5, {scrollTo: {y: newPos}, onComplete: function() {
        //onComplete fires a little early, so adding a little buffer
        setTimeout(function() {
          _disabled = false;
        }, 100);
      }});
    }
  };

  jQuery.fn[pluginName] = function( methodOrOptions ) {

    if ( methodOrOptions && methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }

    var options = $.extend({}, settings, methodOrOptions || {});

    this.each( function () {

      var $el = $(this),
          instance = $.data( this, pluginName );

      if ( instance ) {
        instance.options = options;
      } else {
        $.data( this, pluginName, monitor( $el, options ) );
        $el.on( 'remove', $.proxy( function () {
          $.removeData(this, pluginName);
          unmonitor( instance );

        }, this ) );
      }
    });

    return this;
  }

})(jQuery);

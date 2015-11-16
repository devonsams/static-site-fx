var utility = {
	// Pass a jquery element or 
	setElementMinHeightToWindow: function($element) {	
		$element.css({'min-height': $(window).height() + 'px'});
	},
	animationEvents: 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
	transitionEvents: "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
  	isPromise: function (value) {
		if (!value || !value.then) return false;
	    if (typeof value.then !== "function") {
	      	return false;
	    }
	    var promiseThenSrc = String($.Deferred().then);
	    var valueThenSrc = String(value.then);
	    return promiseThenSrc === valueThenSrc;
	},
	// like the jquery toggle class, but returns a promise that
	// resolves after CSS transitions have completed
	toggleClass: function(container, theClass) {
		var deferred = $.Deferred();

		container.toggleClass(theClass);
		
		container.one(utils.transitionEvents, function(e) {
			deferred.resolve();
  		});

		return deferred.promise();
	},
  	// Just like lodash partial
  	// https://lodash.com/docs#partial
	partial: function(fn /*, args...*/) {
    	// A reference to the Array#slice method.
    	var slice = Array.prototype.slice;
    	// Convert arguments object to an array, removing the first argument.
    	var args = slice.call(arguments, 1);

    	return function() {
      		// Invoke the originally-specified function, passing in all originally-
      		// specified arguments, followed by any just-specified arguments.
      		return fn.apply(this, args.concat(slice.call(arguments, 0)));
    	};
  	}
}
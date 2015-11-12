var utility = {
	// Pass a jquery element or 
	setElementMinHeightToWindow: function($element) {	
		$element.css({'min-height': $(window).height() + 'px'});
	},
}
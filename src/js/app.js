$( document ).ready(function() {

	scrollConfig();
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

	*/

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
	
});
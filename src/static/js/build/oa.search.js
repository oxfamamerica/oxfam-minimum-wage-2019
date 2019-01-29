define(['jquery'], function ($) {
	'use strict';

	var form = $('#Search');
	form.submit(function (e) {
		//Remove all error & success classes
		//e.preventDefault();
		$(".control-group").each(function( index ) {
			$(this).removeClass("warning").removeClass("error");
		});

	});

});

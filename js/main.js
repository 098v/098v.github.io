// JQuery Init
$(window).on('load', function() {
	"use strict";
	// Add Active class
	if ($('.uk-active').length && $('.uk-active').parents('li').length) {
		$('.uk-active').parents('li').addClass('uk-active');
	}
	// Owl Carousel JS
	if ($().owlCarousel !== undefined && $().owlCarousel !== 'undefined') {
		$('.owl-carousel:not(.thumbs)').each(function() {
			var $this = $(this);
			var $nav = false;
			var $singleItem = true;
			var $autoHeight = false;
			var $dotsEach = true;
			var $margin = 0;
			var $loop = true;
			var $dots = false;
			var $items = 1;
			var $center = false;
			var $autoWidth = false;
			var $animateOut = false;
			var $responsiveRefreshRate = 1100;
			var $autoplay = $this.data('autoplay');
			var $autoplayTimeout = $this.data('autoplay-timeout') ? $this.data('autoplay-timeout') : 5000;
			var $autoplayHoverPause = $this.data('autoplay-hoverpause');
			var $responsive = {};
			var $parent = $this.parent();
			if ($parent.hasClass('om-carousel')) {
				$nav = false;
				$autoHeight = true;
			}
			$this.owlCarousel({
				singleItem: $singleItem,
				autoWidth: $autoWidth,
				autoHeight: $autoHeight,
				nav: $nav,
				dots: $dots,
				loop: $loop,
				autoplay: $autoplay,
				autoplayTimeout: $autoplayTimeout,
				autoplayHoverPause: $autoplayHoverPause,
				smartSpeed: 500,
				items: $items,
				center: $center,
				responsiveRefreshRate: $responsiveRefreshRate,
				responsive: $responsive,
				margin: $margin,
				dotsEach: $dotsEach,
				animateOut: $animateOut
			});
		});
	}
});
//StartIsotope
$('.om-isotope-container').each(function() {
	var $crCont = $(this);
	var $itemSelector = $crCont.data('isotope-item') ? $crCont.data('isotope-item') : '.uk-grid>*';
	var $crGrid = $('.isotope-container', $crCont);
	if ($crGrid.length) {
		$crGrid.isotope({
			isResizeBound: false,
			percentPosition: true,
			itemSelector: $itemSelector,
			layoutMode: 'masonry',
			masonry: {
				columnWidth: '.grid-sizer'
			}
		});
		var $om_iso_conts = $(window).data('om_iso_conts') || [];
		$om_iso_conts.push($crGrid);
		$(window).data('om_iso_conts', $om_iso_conts);
		if ($('.om-portfolio-filterli.is-checked', $crCont).length === 0) {
			$('.om-portfolio-filterli', $crCont).first().addClass('is-checked');
		}
		$('.om-portfolio-filterli', $crCont).on('click', function() {
			var $button = $(this);
			$crGrid.isotope({ filter: $('span', $button).data('filter') });
			$button.addClass('is-checked').siblings().removeClass('is-checked');
		});
	}
});
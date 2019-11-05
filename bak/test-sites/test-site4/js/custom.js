document.addEventListener('DOMContentLoaded', () => {
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	if ($navbarBurgers.length > 0) {
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {
				const target = el.dataset.target;
				const $target = document.getElementById(target);
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}
});

$(document).ready(function() {
	$grid = $('.gal').isotope({
		// options
		itemSelector: '.gal__item',
		layoutMode: 'masonry',
		masonry: {
			gutter: 0
		}
	});
	// filter items on button click
	$('.js-filter').on('click', 'a', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
		$('.js-filter a').removeClass('active');
		$(this).addClass('active');
	});
});
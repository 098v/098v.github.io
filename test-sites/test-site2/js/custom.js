// Close mobile & tablet menu on item click
$('.navbar-item').each(function(e) {
		$(this).click(function() {
				if ($('#navbar-burger-id').hasClass('is-active')) {
						$('#navbar-burger-id').removeClass('is-active');
						$('#navbar-menu-id').removeClass('is-active');
				}
		});
});

// Open or Close mobile & tablet menu
$('#navbar-burger-id').click(function() {
		if ($('#navbar-burger-id').hasClass('is-active')) {
				$('#navbar-burger-id').removeClass('is-active');
				$('#navbar-menu-id').removeClass('is-active');
		} else {
				$('#navbar-burger-id').addClass('is-active');
				$('#navbar-menu-id').addClass('is-active');
		}
});

// Change Navbar colour on scroll
$(document).ready(function() {
		// Transition effect for navbar 
		$(window).scroll(function() {
				// checks if window is scrolled more than 500px, adds/removes solid class
				if ($(this).scrollTop() > 500) {
						$('#navMenu').addClass('solid');
				} else {
						$('#navMenu').removeClass('solid');
				}
		});
});
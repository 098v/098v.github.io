// Burger
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

$(window).scroll(function(e) {
	parallax();
});

// Parallax
function parallax() {
	var scrolled = $(window).scrollTop();
	$('.hero').css('top', -(scrolled * 0.0315) + 'rem');
	$('.hero > h1').css('top', -(scrolled * -0.005) + 'rem');
	$('.hero > h1').css('opacity', 1 - (scrolled * .00175));
};

// Gallery/Lightbox
function openModal() {
	document.getElementById('myModal').style.display = "block";
}

function closeModal() {
	document.getElementById('myModal').style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("item-slide");
	var captionText = document.getElementById("caption");
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "block";
}

// Fade Arrow on Scroll
$(window).scroll(function() {
	$(".arrow").css("opacity", 1 - $(window).scrollTop() / 500);
	//250 is fade pixels
});